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
        { upsert: true, returnDocument: 'after' }
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
 * Get raw pages from Facebook Graph API without saving them
 * GET /api/pages/facebook-raw
 */
const getFacebookRawPages = async (req, res) => {
  try {
    const user = req.user;
    if (!user.accessToken) {
      return res.status(400).json({ message: 'User access token is missing. Please re-authenticate.' });
    }

    // 1. Decrypt user's access token
    const decryptedUserToken = cryptoService.decrypt(user.accessToken);

    // 2. Fetch pages from Facebook Graph API
    const rawPages = await facebookService.getUserPages(decryptedUserToken);

    // 3. Map pages without exposing page access tokens
    const pagesList = rawPages.map(page => ({
      pageId: page.id,
      pageName: page.name,
      category: page.category || '',
      picture: page.picture?.data?.url || '',
    }));

    res.json(pagesList);
  } catch (err) {
    console.error('Fetch Raw Pages Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Save only selected pages from Facebook to MongoDB
 * POST /api/pages/connect-selected
 */
const saveSelectedPages = async (req, res) => {
  try {
    const user = req.user;
    const { pageIds } = req.body; // Array of page IDs selected by the user

    if (!Array.isArray(pageIds)) {
      return res.status(400).json({ message: 'pageIds must be an array of strings' });
    }

    if (!user.accessToken) {
      return res.status(400).json({ message: 'User access token is missing. Please re-authenticate.' });
    }

    // 1. Decrypt user's access token
    const decryptedUserToken = cryptoService.decrypt(user.accessToken);

    // 2. Fetch pages from Facebook Graph API
    const rawPages = await facebookService.getUserPages(decryptedUserToken);

    // 3. Filter pages to keep only selected ones
    const selectedRawPages = rawPages.filter(p => pageIds.includes(p.id));

    // 4. Save/update selected pages and delete unselected ones
    const savedPages = [];
    for (const rawPage of selectedRawPages) {
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
        { upsert: true, returnDocument: 'after' }
      );
      savedPages.push(updatedPage);
    }

    // Delete any pages that are NOT in the selected list for this user
    await FacebookPage.deleteMany({
      ownerUserId: user._id,
      pageId: { $nin: pageIds }
    });

    res.json({
      message: 'Selected pages connected successfully',
      pages: savedPages.map(p => ({
        _id: p._id,
        pageId: p.pageId,
        pageName: p.pageName,
        category: p.category,
        picture: p.picture
      }))
    });
  } catch (err) {
    console.error('Save Selected Pages Error:', err.message);
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
  getFacebookRawPages,
  saveSelectedPages,
};
