const express = require('express');
const router = express.Router();
const productivityController = require('../controllers/Production.controler');

router.get('/productivity', productivityController.getProductiveAnalysisData);

module.exports = router;
