const Device = require('../models/Production.model');

// Fetching data for productive analysis
exports.getProductiveAnalysisData = async (req, res) => {
    try {
        const zoneData = await Device.findAll({
            attributes: [
                'zoneName',
                'rawMaterialInput',
                'rawMaterialOutput',
                'wasteScrap',
                'wasteDefect',
                'actualProduction'
            ]
        });

        const formattedData = zoneData.map((device) => ({
            zoneName: device.zoneName,
            rawMaterialInput: device.rawMaterialInput,
            rawMaterialOutput: device.rawMaterialOutput,
            wasteScrap: device.wasteScrap,
            wasteDefect: device.wasteDefect,
            actualProduction: device.actualProduction
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching productive analysis data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};
