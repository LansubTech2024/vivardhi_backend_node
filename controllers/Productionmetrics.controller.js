// controllers/device.controller.js
const Device = require('../models/Productionmetrics.model');

// Gauge chart for Total Production
const getTotalProduction = async (req, res) => {
  try {
    const totalProduction = await Device.sum('totalProduction');
    res.json({ totalProduction });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total production', error });
  }
};

// Gauge chart for Target Production
const getTargetProduction = async (req, res) => {
  try {
    const targetProduction = await Device.sum('target');
    res.json({ targetProduction });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching target production', error });
  }
};

// Gauge chart for Achieved Target (as a percentage of target)
const getAchievedTarget = async (req, res) => {
  try {
    const totalProduction = await Device.sum('totalProduction');
    const targetProduction = await Device.sum('target');
    const achievedTarget = ((totalProduction / targetProduction) * 100).toFixed(2); // Percentage
    res.json({ achievedTarget: Math.min(achievedTarget, 100) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achieved target', error });
  }
};

// Bar chart for Manpower Allocation
const getManpowerAllocation = async (req, res) => {
  try {
    const manpowerAllocation = await Device.findAll({
      attributes: ['zoneName', 'manpower'],
    });
    res.json(manpowerAllocation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manpower allocation', error });
  }
};

// Line chart for Raw Material Inventory
const getRawMaterialInventory = async (req, res) => {
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
const getFinishedMaterial = async (req, res) => {
  try {
    const finishedMaterial = await Device.sum('rawMaterialOutput');
    res.json({ finishedMaterial });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching finished material', error });
  }
};

module.exports = {
  getTotalProduction,
  getTargetProduction,
  getAchievedTarget,
  getManpowerAllocation,
  getRawMaterialInventory,
  getFinishedMaterial,
};
