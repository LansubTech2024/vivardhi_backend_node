
const express = require('express');
const router = express.Router();
const DetailedgraphController = require('../controllers/detailed_graph.controller');

router.get('/line-chart-popup', DetailedgraphController.generateLineChart);
router.get('/waterfall-chart-popup', DetailedgraphController.generateWaterfallChart);
router.get('/donut-chart-popup', DetailedgraphController.generateDonutChart);
router.get('/combination-chart-popup', DetailedgraphController.generateCombinationChart);

module.exports = router;