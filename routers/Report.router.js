// routers/Report.router.js
const express = require('express');
const router = express.Router();
const {
  getOEESummary,
  getProductionTargetAchievement,
  getMaterialInventory,
  getPowerConsumption
} = require('../controllers/Report.controller');

// Route to get OEE summary
router.get('/oee-summary', getOEESummary);

// Route to get Production Target vs Achievement data
router.get('/production-target-achievement', getProductionTargetAchievement);

// Route to get Material Inventory data
router.get('/material-inventory', getMaterialInventory);

// Route to get Power Consumption data
router.get('/power-consumption', getPowerConsumption);

module.exports = router;
