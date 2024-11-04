const express = require('express');
const router = express.Router();
const { getMachines } = require('../controllers/machineAnalysis.controller');


router.get('/detailed-machine', getMachines);

module.exports = router;