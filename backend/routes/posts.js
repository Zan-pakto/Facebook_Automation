const express = require('express');
const router = express.Router();
const { publishPost, getHistory, schedulePost, getScheduledPosts, cancelScheduledPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/publish', protect, upload.single('media'), publishPost);
router.get('/history', protect, getHistory);

router.post('/schedule', protect, upload.single('media'), schedulePost);
router.get('/scheduled', protect, getScheduledPosts);
router.delete('/scheduled/:id', protect, cancelScheduledPost);

module.exports = router;
