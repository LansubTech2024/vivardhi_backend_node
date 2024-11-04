const ProductionData = require('../models/Production.model');

// Fetching data for productive analysis
exports.getProductiveAnalysisData = async (req, res) => {
    try {
        const zoneData = await ProductionData.findAll({
            attributes: [
                'zoneName',
                'date',
                'machineId',
                'rawMaterialInput',
                'rawMaterialOutput',
                'wasteScrap',
                'wasteDefect',
                'targetProduction',
                'actualProduction',
                'overallProductivity'
            ]
        });

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
