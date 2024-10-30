// routes/device.routes.js
const express = require('express');
const {
  getTotalProduction,
  getTargetProduction,
  getAchievedTarget,
  getManpowerAllocation,
  getRawMaterialInventory,
  getFinishedMaterial,
} = require('../controllers/Productionmetrics.controller');

const router = express.Router();

// Define routes for each chart data
router.get('/total-production', getTotalProduction);
router.get('/target-production', getTargetProduction);
router.get('/achieved-target', getAchievedTarget);
router.get('/manpower-allocation', getManpowerAllocation);
router.get('/raw-material-inventory', getRawMaterialInventory);
router.get('/finished-material', getFinishedMaterial);

module.exports = router;
