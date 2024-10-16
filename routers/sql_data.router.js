const express = require('express');
const router = express.Router();
const importMachinesController = require('../controllers/sql_data.controller.js');

// Route to import machines from JSON
router.post('/import-machines', importMachinesController.importMachines);

module.exports = router;
