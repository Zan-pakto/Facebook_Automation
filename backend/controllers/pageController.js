const FacebookPage = require('../models/FacebookPage');
const facebookService = require('../services/facebookService');
const cryptoService = require('../services/cryptoService');

/**
 * Sync pages from Facebook Graph API
 * POST /api/pages/sync
 */
const syncPages = async (req, res) => {
  try {
    const user = req.user;
    if (!user.accessToken) {
      return res.status(400).json({ message: 'User access token is missing. Please re-authenticate.' });
    }

    // 1. Decrypt user's access token
    const decryptedUserToken = cryptoService.decrypt(user.accessToken);

    // 2. Fetch pages from Facebook Graph API
    const rawPages = await facebookService.getUserPages(decryptedUserToken);
    
    const syncedPages = [];

    // 3. Save / update each page in MongoDB
    for (const rawPage of rawPages) {
      const encryptedPageToken = cryptoService.encrypt(rawPage.access_token);
      const pictureUrl = rawPage.picture?.data?.url || '';

      const updatedPage = await FacebookPage.findOneAndUpdate(
        { pageId: rawPage.id, ownerUserId: user._id },
        {
          pageName: rawPage.name,
          pageAccessToken: encryptedPageToken,
          category: rawPage.category || '',
          picture: pictureUrl,
        },
        { upsert: true, new: true }
      );
      
      syncedPages.push(updatedPage);
    }

    // Return synced pages without sensitive tokens
    const pagesResponse = syncedPages.map(p => ({
      _id: p._id,
      pageId: p.pageId,
      pageName: p.pageName,
      category: p.category,
      picture: p.picture,
      createdAt: p.createdAt
    }));

    res.json({
      message: 'Pages synced successfully',
      pages: pagesResponse
    });
  } catch (err) {
    console.error('Page Sync Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all synced Facebook Pages for current user
 * GET /api/pages
 */
const getPages = async (req, res) => {
  try {
    const pages = await FacebookPage.find({ ownerUserId: req.user._id })
      .select('-pageAccessToken'); // Exclude sensitive tokens
    res.json(pages);
  } catch (err) {
    console.error('Get Pages Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  syncPages,
  getPages,
};
