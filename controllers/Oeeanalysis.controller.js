const Device = require('../models/Oeeanalysis.model'); // Ensure correct path

exports.calculateOEE = async (req, res) => {
    try {
        // Fetch device data
        const devices = await Device.findAll();
        
        if (!devices || devices.length === 0) {
            console.log("No device data found.");
            return res.status(404).json({ message: "No devices found for OEE calculation." });
        }

        // Proceed with OEE calculations here
        const calculations = devices.map(device => {
            const availability = (device.actualRunTime / device.plannedTime) * 100;
            const performance = (device.totalPieces / device.target) * 100;
            const quality = (device.goodPieces / device.totalProduction) * 100;
            const oee = (availability * performance * quality) / 10000; // Divide by 10000 to get a percentage

            return {
                machineId: device.machineId,
                availability,
                performance,
                quality,
                oee,
            };
        });

        console.log("OEE calculations successful:", calculations);
        res.json(calculations);

    } catch (error) {
        console.error("Error calculating OEE:", error.message || error);
        res.status(500).json({ message: "Failed to calculate OEE", error: error.message || error });
    }
};
