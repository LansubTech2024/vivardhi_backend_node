
const PowerUsage = require('../models/powerUsage.model');
const sequelize = require('../DB_connection/db_connection.js');

const POWER_USAGE_LIMIT = 280; // Set threshold for high power usage

exports.getPowerUsageMetrics = async (req, res) => {
  try {
    const currentUsage = await PowerUsage.findOne({ order: [['date', 'DESC']] });
    const averagePower = await PowerUsage.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('powerConsumed')), 'averagePower']],
    });
    const peakPower = await PowerUsage.max('powerConsumed');
    const totalDowntime = await PowerUsage.sum('totalPowerDowntimeDuration');

    // Check if the current power usage exceeds the limit
    const isOverLimit = currentUsage && currentUsage.powerConsumed > POWER_USAGE_LIMIT;
    const alertMessage = isOverLimit
      ? `Power usage is high at ${currentUsage.powerConsumed} kW!`
      : null;
    const suggestion = isOverLimit
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
