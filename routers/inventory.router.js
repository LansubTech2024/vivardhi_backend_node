// routes/inventory.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');

router.get('/inventory', inventoryController.getInventoryData);

module.exports = router;
