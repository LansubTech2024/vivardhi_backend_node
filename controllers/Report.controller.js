// controllers/Report.controller.js
const ProductionData = require('../models/Report.model');

// Get OEE Summary with Zone Filtering
const getOEESummary = async (req, res) => {
  const { zone } = req.query;
  try {
    const data = zone 
      ? await ProductionData.findAll({ where: { zone } }) 
      : await ProductionData.findAll();
    const oeeSummary = calculateOEESummary(data);
    res.json(oeeSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Production Target vs. Achievement (Bar Chart Data) with Zone Filtering
const getProductionTargetAchievement = async (req, res) => {
  const { zone } = req.query;
  try {
    const data = zone 
      ? await ProductionData.findAll({ where: { zone } }) 
      : await ProductionData.findAll();
    const barChartData = calculateProductionTargetAchievement(data);
    res.json(barChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Material Inventory (Line Chart Data) with Zone Filtering
const getMaterialInventory = async (req, res) => {
  const { zone } = req.query;
  try {
    const data = zone 
      ? await ProductionData.findAll({ where: { zone } }) 
      : await ProductionData.findAll();
    const inventoryData = calculateMaterialInventory(data);
    res.json(inventoryData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Power Consumption (Line Chart Data) with Zone Filtering
const getPowerConsumption = async (req, res) => {
  const { zone } = req.query;
  try {
    const data = zone 
      ? await ProductionData.findAll({ where: { zone } }) 
      : await ProductionData.findAll();
    const powerData = calculatePowerConsumption(data);
    res.json(powerData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper functions for calculations
function calculateOEESummary(data) {
  let totalRunTime = 0;
  let totalPlannedTime = 0;
  let totalProducedPieces = 0;
  let totalGoodPieces = 0;
  let totalTargetPieces = 0;

  data.forEach(record => {
    totalRunTime += record.actualRunTime || 0;
    totalPlannedTime += record.plannedTime || 0;
    totalProducedPieces += record.totalPieces || 0;
    totalGoodPieces += record.goodPieces || 0;
    totalTargetPieces += record.target || 0;
  });

  const availability = totalPlannedTime ? (totalRunTime / totalPlannedTime) * 100 : 0;
  const performance = totalTargetPieces ? (totalProducedPieces / totalTargetPieces) * 100 : 0;
  const quality = totalProducedPieces ? (totalGoodPieces / totalProducedPieces) * 100 : 0;
  const oee = (availability * performance * quality) / 10000;

  return {
    oee: oee.toFixed(2),
    availability: availability.toFixed(2),
    performance: performance.toFixed(2),
    quality: quality.toFixed(2)
  };
}

function calculateProductionTargetAchievement(data) {
  let target = 0;
  let actual = 0;

  data.forEach(record => {
    target += record.target || 0;
    actual += record.totalProduction || 0;
  });

  return { target, actual };
}

function calculateMaterialInventory(data) {
  return data.map(record => ({
    date: record.date,
    currentStock: record.currentStock,
    minimumRequired: record.minimumRequired
  }));
}

function calculatePowerConsumption(data) {
  return data.map(record => ({
    date: record.date,
    powerConsumed: record.powerConsumed,
    downtimeDuration: record.totalPowerDowntimeDuration
  }));
}

module.exports = {
  getOEESummary,
  getProductionTargetAchievement,
  getMaterialInventory,
  getPowerConsumption
};
