const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineAnalysis.controller');


router.get("/machines/averages", machineController.getAverageMachineData);
router.get("/machines/:id", machineController.getMachineDetails);

module.exports = router;