const express = require('express');
const router = express.Router();
const { syncPages, getPages } = require('../controllers/pageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getPages);
router.post('/sync', protect, syncPages);

module.exports = router;
