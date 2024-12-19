
const PowerUsage = require('../models/powerUsage.model');
const sequelize = require('../DB_connection/db_connection.js');
const { Op } = require('sequelize');

const POWER_USAGE_LIMIT = 280; 
const OVERHEAT_THRESHOLD = 250;

exports.getPowerUsageMetrics = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const currentUsage = await PowerUsage.findOne({ order: [['date', 'DESC']] });
    const averagePower = await PowerUsage.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('powerConsumed')), 'averagePower']],
    });
    const peakPower = await PowerUsage.max('powerConsumed');
    const totalDowntime = await PowerUsage.sum('totalPowerDowntimeDuration');

    // Check if the current power usage exceeds the limit
    const isOverLimit = currentUsage && currentUsage.powerConsumed > POWER_USAGE_LIMIT;
    const isOverheatingRisk = currentUsage && currentUsage.powerConsumed > OVERHEAT_THRESHOLD;  // Overheating risk based on power usage

    const alertMessage = isOverLimit
      ? `Power usage is high at ${currentUsage.powerConsumed} kW!`
      : isOverheatingRisk
      ? `Warning: High power usage detected at ${currentUsage.powerConsumed} kW. The machine may overheat!`
      : null;

    const suggestion = isOverheatingRisk
      ? "Shut down the machine for cooling to avoid downtime."
      : isOverLimit
      ? "Consider reducing machine load or scheduling downtime during peak hours."
      : null;

    res.json({
      currentUsage: currentUsage ? currentUsage.powerConsumed : 0,
      dailyAveragePower: averagePower[0].dataValues.averagePower,
      peakPower,
      downtime: totalDowntime,
      alert: alertMessage,
      suggestion: suggestion,
    });
  } catch (error) {
    console.error('Error fetching power usage metrics:', error);
    res.status(500).json({ error: 'Failed to fetch power usage metrics' });
  }
};

// Endpoint for live power usage data for the line graph
exports.getLivePowerUsage = async (req, res) => {
    try {
      const currentUsage = await PowerUsage.findOne({ order: [['date', 'DESC']] });
      res.json({
        livePowerUsage: currentUsage ? currentUsage.powerConsumed : 0,
      });
    } catch (error) {
      console.error('Error fetching live power usage:', error);
      res.status(500).json({ error: 'Failed to fetch live power usage' });
    }
  };

  exports.getEnergyConsumption = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      const whereClause = {};
      if (startDate && endDate) {
        whereClause.date = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }
  
      const energyData = await PowerUsage.findAll({
        where: whereClause,
        attributes: [
          [sequelize.fn('DATE', sequelize.col('date')), 'date'],
          [sequelize.fn('SUM', sequelize.col('energyConsumption')), 'energyConsumption'],
        ],
        group: ['date'],
        order: [[sequelize.fn('DATE', sequelize.col('date')), 'ASC']],
      });
  
      const formattedData = energyData.map((entry) => ({
        date: new Date(entry.date).toISOString().split('T')[0],
        energyConsumption: Number(entry.energyConsumption).toFixed(2),
      }));
  
      res.json(formattedData);
    } catch (error) {
      console.error('Error fetching energy consumption data:', error);
      res.status(500).json({ error: 'Failed to fetch energy consumption data' });
    }
  };
