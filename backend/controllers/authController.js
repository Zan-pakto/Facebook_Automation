const jwt = require('jsonwebtoken');
const User = require('../models/User');
const facebookService = require('../services/facebookService');
const cryptoService = require('../services/cryptoService');

/**
 * Initiate Facebook Login by redirecting to Meta OAuth Dialog
 * GET /api/auth/facebook
 */
const redirectToFacebook = (req, res) => {
  const appId = process.env.FB_APP_ID;
  const redirectUri = process.env.FB_REDIRECT_URI;
  const token = req.query.token; // Pass JWT token to link account
  
  if (!appId || !redirectUri) {
    return res.status(500).json({ 
      message: 'Facebook credentials missing on server. Check environment variables.' 
    });
  }

  const scope = [
    'pages_show_list',
    'pages_read_engagement',
    'pages_manage_posts',
    'public_profile',
    'email'
  ].join(',');

  const state = token ? token : 'no_token';

  const fbUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
  
  res.redirect(fbUrl);
};

/**
 * Handle Facebook Login Callback
 * GET /api/auth/facebook/callback
 */
const handleFacebookCallback = async (req, res) => {
  const { code, state, error } = req.query;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  if (error) {
    console.error('Facebook OAuth Callback Error:', error);
    return res.redirect(`${frontendUrl}/dashboard/settings?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return res.redirect(`${frontendUrl}/dashboard/settings?error=no_code_provided`);
  }

  try {
    // 1. Exchange authorization code for user access token
    const shortLivedToken = await facebookService.exchangeCodeForToken(code);
    
    // 2. Exchange for a long-lived user access token
    const longLivedToken = await facebookService.exchangeShortToLongLivedToken(shortLivedToken);
    
    // 3. Fetch user profile information
    const profile = await facebookService.getUserProfile(longLivedToken);
    
    // 4. Encrypt the access token before storing
    const encryptedToken = cryptoService.encrypt(longLivedToken);

    // 5. Connect to existing user if token provided
    if (state && state !== 'no_token') {
      try {
        const decoded = jwt.verify(state, process.env.JWT_SECRET || 'default_jwt_secret');
        let user = await User.findById(decoded.id);
        if (user) {
          user.facebookId = profile.id;
          user.accessToken = encryptedToken;
          if (!user.name) user.name = profile.name;
          await user.save();
          
          return res.redirect(`${frontendUrl}/dashboard/settings?success=facebook_connected`);
        }
      } catch (err) {
        console.error('JWT Verification failed in Facebook callback:', err);
        return res.redirect(`${frontendUrl}/dashboard/settings?error=invalid_token`);
      }
    }

    // 6. Existing fallback: Create or update user in MongoDB if logging in via Facebook
    let user = await User.findOne({ facebookId: profile.id });
    
    if (user) {
      user.name = profile.name;
      user.email = profile.email || user.email;
      user.accessToken = encryptedToken;
      await user.save();
    } else {
      user = new User({
        name: profile.name,
        email: profile.email || '',
        facebookId: profile.id,
        accessToken: encryptedToken,
      });
      await user.save();
    }

    // 7. Generate JWT Session Token
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '30d' }
    );

    // 8. Redirect back to frontend dashboard with JWT
    res.redirect(`${frontendUrl}/auth/callback?token=${jwtToken}`);
  } catch (err) {
    console.error('Facebook Callback Handler Error:', err.message);
    if (state && state !== 'no_token') {
       res.redirect(`${frontendUrl}/dashboard/settings?error=${encodeURIComponent(err.message)}`);
    } else {
       res.redirect(`${frontendUrl}/?error=${encodeURIComponent(err.message)}`);
    }
  }
};

/**
 * Direct Login / Registration with token (for extension/mobile/SDK flow)
 * POST /api/auth/facebook
 */
const loginWithFacebookToken = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ message: 'Facebook access token is required' });
  }

  try {
    // Exchange token for a long-lived one just in case
    let finalToken = accessToken;
    try {
      finalToken = await facebookService.exchangeShortToLongLivedToken(accessToken);
    } catch (tokenErr) {
      console.log('Token is already long-lived or could not exchange: ', tokenErr.message);
    }

    // Fetch user profile
    const profile = await facebookService.getUserProfile(finalToken);
    const encryptedToken = cryptoService.encrypt(finalToken);

    let user = await User.findOne({ facebookId: profile.id });
    
    if (user) {
      user.name = profile.name;
      user.email = profile.email || user.email;
      user.accessToken = encryptedToken;
      await user.save();
    } else {
      user = new User({
        name: profile.name,
        email: profile.email || '',
        facebookId: profile.id,
        accessToken: encryptedToken,
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '30d' }
    );

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        facebookId: user.facebookId,
      }
    });
  } catch (err) {
    console.error('Login with token error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get authenticated user profile
 * GET /api/auth/me
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-accessToken');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete user account and associated data
 * DELETE /api/auth/me
 */
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Optional: Also delete FacebookPage and PostHistory documents associated with this user
    const FacebookPage = require('../models/FacebookPage');
    const PostHistory = require('../models/PostHistory');

    await FacebookPage.deleteMany({ user: userId });
    await PostHistory.deleteMany({ user: userId });
    
    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User account and all associated data deleted successfully' });
  } catch (err) {
    console.error('Delete account error:', err.message);
    res.status(500).json({ message: 'Failed to delete account' });
  }
};

/**
 * Disconnect Facebook account from user profile
 * POST /api/auth/facebook/disconnect
 */
const disconnectFacebook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.facebookId = undefined;
    user.accessToken = undefined;
    await user.save();

    // Delete associated pages
    const FacebookPage = require('../models/FacebookPage');
    await FacebookPage.deleteMany({ ownerUserId: user._id });

    res.json({ message: 'Facebook account disconnected successfully' });
  } catch (err) {
    console.error('Disconnect Facebook error:', err.message);
    res.status(500).json({ message: 'Failed to disconnect Facebook account' });
  }
};

module.exports = {
  redirectToFacebook,
  handleFacebookCallback,
  loginWithFacebookToken,
  getMe,
  deleteAccount,
  disconnectFacebook,
};
