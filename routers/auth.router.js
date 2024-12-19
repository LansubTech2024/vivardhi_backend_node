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
router.put('/resetpassword/:token', authController.ResetPassword);

module.exports = router;