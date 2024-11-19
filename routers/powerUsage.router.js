
const express = require('express');
const { getPowerUsageMetrics, getLivePowerUsage, getEnergyConsumption} = require('../controllers/powerUsage.controller');
const router = express.Router();

router.get('/power-metrics', getPowerUsageMetrics);
router.get('/live-power', getLivePowerUsage);
router.get('/energy-consumption', getEnergyConsumption);

module.exports = router;
