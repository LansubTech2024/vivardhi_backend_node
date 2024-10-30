/// controllers/metrics.controller.js
const Device = require('../models/Productionmetrics.model');

// Calculate Availability, Performance, Quality, and Yield for all devices combined
const calculateMetrics = (devicesData) => {
    // Aggregate data across all devices
    const totalActualRunTime = devicesData.reduce((sum, device) => sum + device.actualRunTime, 0);
    const totalPlannedTime = devicesData.reduce((sum, device) => sum + device.plannedTime, 0);
    const totalPieces = devicesData.reduce((sum, device) => sum + device.totalPieces, 0);
    const totalTarget = devicesData.reduce((sum, device) => sum + device.target, 0);
    const totalGoodPieces = devicesData.reduce((sum, device) => sum + device.goodPieces, 0);
    const totalProduction = devicesData.reduce((sum, device) => sum + device.totalProduction, 0);
    const totalRawMaterialUsed = devicesData.reduce((sum, device) => sum + device.rawMaterialUsed, 0);

    // Calculate metrics
    const availability = (totalActualRunTime / totalPlannedTime) * 100;
    const performance = (totalPieces / totalTarget) * 100;
    const quality = (totalGoodPieces / totalProduction) * 100;
    const yieldValue = (totalGoodPieces / totalRawMaterialUsed) * 100;

    const oee = (availability * performance * quality) / 10000; // OEE as a percentage

    return { availability, performance, quality, yield: yieldValue, oee };
};

exports.getOEEData = async (req, res) => {
    try {
        const devicesData = await Device.findAll();
        
        // Calculate combined OEE metrics for all devices
        const { availability, performance, quality, yield: yieldValue, oee } = calculateMetrics(devicesData);

        res.status(200).json({ availability, performance, quality, yield: yieldValue, oee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Gauge chart for Total Production
exports.getTotalProduction = async (req, res) => {
  try {
    const totalProduction = await Device.sum('totalProduction');
    res.json({ totalProduction });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total production', error });
  }
};

// Gauge chart for Target Production
exports.getTargetProduction = async (req, res) => {
  try {
    const targetProduction = await Device.sum('target');
    res.json({ targetProduction });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching target production', error });
  }
};

// Gauge chart for Achieved Target (as a percentage of target)
exports.getAchievedTarget = async (req, res) => {
  try {
    const totalProduction = await Device.sum('totalProduction');
    const targetProduction = await Device.sum('target');
    const achievedTarget = ((totalProduction / targetProduction) * 100).toFixed(2);
    res.json({ achievedTarget: Math.min(achievedTarget, 100) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achieved target', error });
  }
};

// Bar chart for Manpower Allocation by Zone
exports.getManpowerAllocation = async (req, res) => {
  try {
    const manpowerAllocation = await Device.findAll({
      attributes: ['zoneName', 'manpower'],
    });
    res.json(manpowerAllocation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manpower allocation', error });
  }
};

// Line chart for Raw Material Inventory over time
exports.getRawMaterialInventory = async (req, res) => {
  try {
    const inventory = await Device.findAll({
      attributes: ['date', 'rawMaterialInput', 'rawMaterialOutput'],
    });
    const inventoryData = inventory.map(record => ({
      date: record.date,
      inventory: record.rawMaterialInput - record.rawMaterialOutput,
    }));
    res.json(inventoryData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching raw material inventory', error });
  }
};

// Bar chart for Finished Material (Output)
exports.getFinishedMaterial = async (req, res) => {
  try {
    const finishedMaterial = await Device.sum('rawMaterialOutput');
    res.json({ finishedMaterial });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching finished material', error });
  }
};
