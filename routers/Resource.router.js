const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/Resource.controller');

// API route to get resource allocation data
router.get('/resources', resourceController.getResources);

module.exports = router;
