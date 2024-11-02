// controllers/OeeAnalysis.controller.js
const Device = require('../models/Oeeanalysis.model');

exports.calculateOEE = async (req, res) => {
    try {
        const devices = await Device.findAll();

        const machineOEEData = devices.map(device => {
            // Calculating OEE components
            const availability = (device.actualRunTime / device.plannedTime) * 100;
            const performance = (device.totalPieces / device.target) * 100;
            const quality = (device.goodPieces / device.totalProduction) * 100;
            const oee = (availability * performance * quality) / 10000;

            // Additional details per machine
            const uptime = device.uptime;
            const downtime = device.totalDowntimeDuration;
            const wasteScrap = device.wasteScrap;
            const wasteDefect = device.wasteDefect;
            const machineStatus = device.uptime > 0 ? "ON" : "OFF"; // Checking if the machine is currently running

            return {
                machineId: device.machineId,
                zoneName: device.zoneName,
                availability: availability.toFixed(2),
                performance: performance.toFixed(2),
                quality: quality.toFixed(2),
                oee: oee.toFixed(2),
                uptime,
                downtime,
                machineStatus,
                productionDetails: {
                    totalPieces: device.totalPieces,
                    goodPieces: device.goodPieces,
                    wasteScrap,
                    wasteDefect
                }
            };
        });

        res.json(machineOEEData);
    } catch (error) {
        console.error("Error calculating OEE:", error);
        res.status(500).json({ message: "Failed to calculate OEE" });
    }
};
