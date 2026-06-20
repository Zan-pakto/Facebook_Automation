const express = require('express');
const router = express.Router();
const { redirectToFacebook, handleFacebookCallback, loginWithFacebookToken, getMe, deleteAccount 
} = require('../controllers/authController');
const createAccount = require('../controllers/createaccount');
const { protect } = require('../middleware/authMiddleware');
const login = require('../controllers/login');

router.get('/facebook', redirectToFacebook);
router.get('/facebook/callback', handleFacebookCallback);
router.post('/facebook', loginWithFacebookToken);
router.post('/createaccount', createAccount);
router.post('/login', login);
router.get('/me', protect, getMe);
router.delete('/me', protect, deleteAccount);

module.exports = router;
