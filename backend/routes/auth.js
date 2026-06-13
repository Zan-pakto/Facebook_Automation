const express = require('express');
const router = express.Router();
const { redirectToFacebook, handleFacebookCallback, loginWithFacebookToken, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.get('/facebook', redirectToFacebook);
router.get('/facebook/callback', handleFacebookCallback);
router.post('/facebook', loginWithFacebookToken);
router.get('/me', protect, getMe);

module.exports = router;
