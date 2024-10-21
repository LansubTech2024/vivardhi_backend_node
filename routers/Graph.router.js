const express = require('express');
const generateGraphsData  = require('../controllers/Graph.controller');

const router = express.Router();

// Define the route for generating graph data
router.get('/charts', generateGraphsData.generateGraphsData);

module.exports = router;