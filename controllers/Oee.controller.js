// controllers/oeeController.js
const Device = require('../models/Device');

// Calculate Availability, Performance, Quality, and Yield
const calculateMetrics = (deviceData) => {
    const availability = (deviceData.actualRunTime / deviceData.plannedTime) * 100;
    const performance = (deviceData.totalPieces / deviceData.target) * 100;
    const quality = (deviceData.goodPieces / deviceData.totalProduction) * 100;
    const yieldValue = (deviceData.goodPieces / deviceData.rawMaterialUsed) * 100;

    const oee = (availability * performance * quality) / 10000; // OEE as a percentage

    return { availability, performance, quality, yield: yieldValue, oee };
};

exports.getOEEData = async (req, res) => {
    try {
        const deviceData = await Device.findAll();
        
        // Map through each device to calculate OEE metrics
        const metrics = deviceData.map(device => {
            const { availability, performance, quality, yield: yieldValue, oee } = calculateMetrics(device);
            return { deviceId: device.id, availability, performance, quality, yield: yieldValue, oee };
        });

        res.status(200).json({ metrics });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all production metrics
exports.getProductionMetrics = async (req, res) => {
    try {
        const data = await ProductionData.findOne({
            attributes: [
                'totalProduction', 
                'targetProduction', 
                'actualProduction', 
                'scrap', 
                'defect', 
                'manpowerAllocation', 
                'rawMaterialReceived', 
                'finishedProduction'
            ]
        });

        if (!data) {
            return res.status(404).json({ message: 'No data found' });
        }

        const { totalProduction, targetProduction, actualProduction } = data;
        const achievedPercentage = targetProduction > 0 ? (actualProduction / targetProduction) * 100 : 0;

        res.json({
            productionData: {
                totalProduction,
                targetProduction,
                achievedPercentage: achievedPercentage.toFixed(1),
            },
            scrapData: data.scrap,
            defectData: data.defect,
            manpowerData: data.manpowerAllocation,
            inventoryData: {
                rawMaterialReceived: data.rawMaterialReceived,
                finishedProduction: data.finishedProduction
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: 'Server error' });
    }
};