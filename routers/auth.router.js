const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../Middleware/auth.middleware');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);
router.put('/updateprofile',authMiddleware,authController.updateProfile);
module.exports = router;