
const express = require('express');
const { getPowerUsageMetrics, getLivePowerUsage } = require('../controllers/powerUsage.controller');
const router = express.Router();

router.get('/power-metrics', getPowerUsageMetrics);
router.get('/live-power', getLivePowerUsage);

module.exports = router;
