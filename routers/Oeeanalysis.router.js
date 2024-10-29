// routes/deviceRouter.js
const express = require('express');
const router = express.Router();
const { calculateOEE } = require('../controllers/Oeeanalysis.controller');

router.get('/oeeanalysis', calculateOEE);

module.exports = router;

