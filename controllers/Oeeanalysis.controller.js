
    // try {
    //     const devices = await Device.findAll();

    //     const machineOEEData = devices.map(device => {

    //         const availability = (device.actualRunTime / device.plannedTime) * 100;
    //         const performance = (device.totalPieces / device.target) * 100;
    //         const quality = (device.goodPieces / device.totalProduction) * 100;
    //         const oee = (availability * performance * quality) / 10000;


    //         const uptime = device.uptime;
    //         const downtime = device.totalDowntimeDuration;
    //         const wasteScrap = device.wasteScrap;
    //         const wasteDefect = device.wasteDefect;
    //         const target = device.target;
    //         const machineStatus = device.uptime > 0 ? "ON" : "OFF"; 

    //         return {
    //             machineId: device.machineId,
    //             zoneName: device.zoneName,
    //             availability: availability.toFixed(2),
    //             performance: performance.toFixed(2),
    //             quality: quality.toFixed(2),
    //             oee: oee.toFixed(2),
    //             uptime,
    //             downtime,
    //             machineStatus,
    //             target,
    //             productionDetails: {
    //                 totalPieces: device.totalPieces,
    //                 goodPieces: device.goodPieces,
    //                 wasteScrap,
    //                 wasteDefect
    //             }
    //         };
    //     });

    //     res.json(machineOEEData);
    // } catch (error) {
    //     console.error("Error calculating OEE:", error);
    //     res.status(500).json({ message: "Failed to calculate OEE" });
    // }

    const Device = require('../models/Oeeanalysis.model');

exports.calculateOEE = async (req, res) => {
    try {
        // Changed from findAll() to find({})
        const devices = await Device.find({});
        
        // Rest of the code remains same since it's just data processing
        const zoneWiseData = {};
        devices.forEach(device => {
            const { zoneName, machineId } = device;
            if (!zoneWiseData[zoneName]) {
                zoneWiseData[zoneName] = {};
            }
            if (!zoneWiseData[zoneName][machineId]) {
                zoneWiseData[zoneName][machineId] = [];
            }
            zoneWiseData[zoneName][machineId].push(device);
        });

        const zoneResults = Object.entries(zoneWiseData).map(([zoneName, machines]) => {
            const machineResults = Object.entries(machines).map(([machineId, machineData]) => {
                let totalAvailability = 0;
                let totalPerformance = 0;
                let totalQuality = 0;
                let totalOEE = 0;
                machineData.forEach(device => {
                    const availability = (device.actualRunTime / device.plannedTime) * 100;
                    const performance = (device.totalPieces / device.target) * 100;
                    const quality = (device.goodPieces / device.totalProduction) * 100;
                    const oee = (availability * performance * quality) / 10000;
                    totalAvailability += availability;
                    totalPerformance += performance;
                    totalQuality += quality;
                    totalOEE += oee;
                });
                const count = machineData.length;
                return {
                    machineId,
                    avgAvailability: (totalAvailability / count).toFixed(2),
                    avgPerformance: (totalPerformance / count).toFixed(2),
                    avgQuality: (totalQuality / count).toFixed(2),
                    avgOEE: (totalOEE / count).toFixed(2)
                };
            });
            return {
                zoneName,
                machines: machineResults
            };
        });
        res.json(zoneResults);
    } catch (error) {
        console.error("Error calculating zone-wise OEE:", error);
        res.status(500).json({ message: "Failed to calculate zone-wise OEE" });
    }
};