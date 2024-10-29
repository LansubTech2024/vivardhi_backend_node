const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/Production.controler');

router.get('/productive-analysis', deviceController.getProductiveAnalysisData);

module.exports = router;
