const express = require('express');
const router = express.Router();
const { syncPages, getPages, getFacebookRawPages, saveSelectedPages } = require('../controllers/pageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getPages);
router.get('/facebook-raw', protect, getFacebookRawPages);
router.post('/sync', protect, syncPages);
router.post('/connect-selected', protect, saveSelectedPages);

module.exports = router;
