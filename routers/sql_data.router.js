const express = require('express');
const router = express.Router();
const {importMachines} = require('../controllers/sql_data.controller.js');

// Route to import machines from JSON
router.post('/import-machines', importMachines);

module.exports = router;
