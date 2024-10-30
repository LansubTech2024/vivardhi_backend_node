// routers/metrics.router.js
const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/Oee.controller');

// Route for fetching OEE data (Availability, Performance, Quality, Yield, OEE)
router.get('/oee', metricsController.getOEEData);

// Route for Total Production (Gauge chart)
router.get('/total-production', metricsController.getTotalProduction);

// Route for Target Production (Gauge chart)
router.get('/target-production', metricsController.getTargetProduction);

// Route for Achieved Target (Gauge chart)
router.get('/achieved-target', metricsController.getAchievedTarget);

// Route for Manpower Allocation (Bar chart)
router.get('/manpower-allocation', metricsController.getManpowerAllocation);

// Route for Raw Material Inventory (Line chart)
router.get('/raw-material-inventory', metricsController.getRawMaterialInventory);

// Route for Finished Material (Output, Bar chart)
router.get('/finished-material', metricsController.getFinishedMaterial);

module.exports = router;
