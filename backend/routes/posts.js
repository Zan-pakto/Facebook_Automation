const express = require('express');
const router = express.Router();
const { publishPost, getHistory } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/publish', protect, upload.single('media'), publishPost);
router.get('/history', protect, getHistory);

module.exports = router;
