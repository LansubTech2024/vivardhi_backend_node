const PowerUsage = require('../models/powerUsage.model');

const POWER_USAGE_LIMIT = 280;
const OVERHEAT_THRESHOLD = 250;

exports.getPowerUsageMetrics = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        // Get current usage (latest record)
        const currentUsage = await PowerUsage.findOne().sort({ date: -1 });

        // Get average power consumption
        const averagePowerResult = await PowerUsage.aggregate([
            {
                $group: {
                    _id: null,
                    averagePower: { $avg: "$powerConsumed" }
                }
            }
        ]);

        // Get peak power
        const peakPowerResult = await PowerUsage.aggregate([
            {
                $group: {
                    _id: null,
                    peakPower: { $max: "$powerConsumed" }
                }
            }
        ]);

        // Get total downtime
        const downtimeResult = await PowerUsage.aggregate([
            {
                $group: {
                    _id: null,
                    totalDowntime: { $sum: "$totalPowerDowntimeDuration" }
                }
            }
        ]);

        const currentPowerValue = currentUsage ? currentUsage.powerConsumed : 0;
        const isOverLimit = currentPowerValue > POWER_USAGE_LIMIT;
        const isOverheatingRisk = currentPowerValue > OVERHEAT_THRESHOLD;

        const alertMessage = isOverLimit
            ? `Power usage is high at ${currentPowerValue} kW!`
            : isOverheatingRisk
                ? `Warning: High power usage detected at ${currentPowerValue} kW. The machine may overheat!`
                : null;

        const suggestion = isOverheatingRisk
            ? "Shut down the machine for cooling to avoid downtime."
            : isOverLimit
                ? "Consider reducing machine load or scheduling downtime during peak hours."
                : null;

        res.json({
            currentUsage: currentPowerValue,
            dailyAveragePower: averagePowerResult[0]?.averagePower || 0,
            peakPower: peakPowerResult[0]?.peakPower || 0,
            downtime: downtimeResult[0]?.totalDowntime || 0,
            alert: alertMessage,
            suggestion: suggestion,
        });
    } catch (error) {
        console.error('Error fetching power usage metrics:', error);
        res.status(500).json({ error: 'Failed to fetch power usage metrics' });
    }
};

exports.getLivePowerUsage = async (req, res) => {
    try {
        const currentUsage = await PowerUsage.findOne().sort({ date: -1 });
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

        let matchStage = {};
        if (startDate && endDate) {
            matchStage = {
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            };
        }

        const energyData = await PowerUsage.aggregate([
            {
                $match: matchStage
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date"
                        }
                    },
                    energyConsumption: { $sum: "$energyConsumption" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    energyConsumption: {
                        $round: ["$energyConsumption", 2]
                    }
                }
            }
        ]);

        res.json(energyData);
    } catch (error) {
        console.error('Error fetching energy consumption data:', error);
        res.status(500).json({ error: 'Failed to fetch energy consumption data' });
    }
};