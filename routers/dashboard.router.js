const express = require('express');
const router = express.Router();
const Dashboard = require('../controllers/dashboard.controller');

router.get('/dashboard', Dashboard.getMetrics);

module.exports = router;
