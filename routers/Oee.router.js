// routes/oeeRoutes.js
const express = require('express');
const router = express.Router();
const oeeController = require('../controllers/Oee.controller');

// Route to get OEE data
router.get('/oee', oeeController.getOEEData);

module.exports = router;
