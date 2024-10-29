// controllers/deviceController.js
const Device = require('../models/Oeeanalysis.model');

const calculateOEE = async (req, res) => {
  try {
    const devices = await Device.findAll();

    const results = devices.map(device => {
      const availability = device.uptime / device.plannedTime;
      const performance = (device.totalPieces / device.target) * (device.uptime / device.actualRunTime);
      const quality = device.goodPieces / device.totalProduction;

      return {
        machineId: device.machineId,
        machineName: device.machineId, // Assuming machine name is same as machineId, update if needed
        oee: availability * performance * quality,
        availability: availability * 100, // Percentage
        performance: performance * 100, // Percentage
        quality: quality * 100 // Percentage
      };
    });

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching device data.' });
  }
};

module.exports = { calculateOEE };
