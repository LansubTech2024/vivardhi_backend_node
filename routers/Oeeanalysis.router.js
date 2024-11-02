// routes/deviceRouter.js
const express = require('express');
const router = express.Router();
const { calculateOEE } = require('../controllers/Oeeanalysis.controller');


router.get('/oeemachine', calculateOEE);

// Route to get details of a specific machine


module.exports = router;

