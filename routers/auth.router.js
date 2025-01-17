const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../Middleware/auth.middleware');

// Signup route
router.post('/signup', authController.SignUp);

// Login route
router.post('/login', authController.SignIn);
router.put('/updateprofile',authMiddleware,authController.UpdateProfile);

router.post('/forgot-password', authController.ForgotPassword);

router.post('/reset-password/:randomString/:expirationTimestamp', authController.ResetPassword);


// New QR code refresh route
//router.post('/refresh-qr', authMiddleware, authController.refreshQRCode);


module.exports = router;