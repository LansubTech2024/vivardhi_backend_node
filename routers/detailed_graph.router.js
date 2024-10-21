
const express = require('express');
const router = express.Router();
const DetailedgraphController = require('../controllers/detailed_graph.controller');

router.get('/line-chart-popup', DetailedgraphController.lineChartPopup);
router.get('/waterfall-chart-popup', DetailedgraphController.waterfallChartPopup);
router.get('/donut-chart-popup', DetailedgraphController.donutChartPopup);
router.get('/combination-chart-popup', DetailedgraphController.combinationChartPopup);

module.exports = router;