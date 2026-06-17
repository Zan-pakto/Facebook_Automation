const express = require('express');
const router = express.Router();
const { redirectToFacebook, handleFacebookCallback, loginWithFacebookToken, getMe, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.get('/facebook', redirectToFacebook);
router.get('/facebook/callback', handleFacebookCallback);
router.post('/facebook', loginWithFacebookToken);
router.get('/me', protect, getMe);
router.delete('/me', protect, deleteAccount);

module.exports = router;
