const ProductionData = require('../models/Production.model');

// Fetching data for productive analysis
exports.getProductiveAnalysisData = async (req, res) => {
    try {
        // Using MongoDB find() instead of Sequelize findAll()
        const zoneData = await ProductionData.find({}, {
            zoneName: 1,
            date: 1,
            machineId: 1,
            rawMaterialInput: 1,
            rawMaterialOutput: 1,
            wasteScrap: 1,
            wasteDefect: 1,
            targetProduction: 1,
            actualProduction: 1,
            overallProductivity: 1,
            _id: 0  // Exclude the _id field from results
        });

        // Since MongoDB already returns plain objects, we don't need complex mapping
        // But keeping the map to ensure the exact same response structure
        const formattedData = zoneData.map((device) => ({
            zoneName: device.zoneName,
            date: device.date,
            machineId: device.machineId,
            rawMaterialInput: device.rawMaterialInput,
            rawMaterialOutput: device.rawMaterialOutput,
            wasteScrap: device.wasteScrap,
            wasteDefect: device.wasteDefect,
            targetProduction: device.targetProduction,
            actualProduction: device.actualProduction,
            overallProductivity: device.overallProductivity
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching productive analysis data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};