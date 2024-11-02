const MachineData = require('../models/dashboard.model');
const { Sequelize } = require('sequelize');

exports.getMetrics = async (req, res) => {
  try {
    // Fetch data grouped by date
    const data = await MachineData.findAll({
      attributes: [
        'date',
        [Sequelize.fn('sum', Sequelize.col('uptime')), 'totalUptime'],
        [Sequelize.fn('sum', Sequelize.col('plannedTime')), 'totalPlannedTime'],
        [Sequelize.fn('sum', Sequelize.col('actualRunTime')), 'totalActualRunTime'],
        [Sequelize.fn('sum', Sequelize.col('goodPieces')), 'totalGoodPieces'],
        [Sequelize.fn('sum', Sequelize.col('totalPieces')), 'totalPieces'],
        [Sequelize.fn('sum', Sequelize.col('wasteScrap')), 'totalWasteScrap'],
        [Sequelize.fn('sum', Sequelize.col('wasteDefect')), 'totalWasteDefect'],
        [Sequelize.fn('sum', Sequelize.col('wasteRecycled')), 'totalWasteRecycled'],
        [Sequelize.fn('sum', Sequelize.col('totalProduction')), 'totalProduction'],
        [Sequelize.fn('sum', Sequelize.col('targetProduction')), 'targetProduction'],
        [Sequelize.fn('sum', Sequelize.col('manpower')), 'totalManpower'],
        [Sequelize.fn('sum', Sequelize.col('allocatedHours')), 'totalAllocatedHours'],
        [Sequelize.fn('sum', Sequelize.col('rawMaterialInput')), 'totalRawMaterialInput'],
        [Sequelize.fn('sum', Sequelize.col('rawMaterialOutput')), 'totalRawMaterialOutput'],
        [Sequelize.fn('sum', Sequelize.col('finishedGoodCurrentStock')), 'totalFinishedGoodStock'],
        [Sequelize.fn('sum', Sequelize.col('finishedGoodMinimumRequired')), 'finishedGoodMinimumRequired'],
      ],
      group: ['date'],
      order: [['date', 'ASC']]
    });

    // Calculate metrics for each date
    const metrics = data.map((record, index) => {
      const previousRecord = index > 0 ? data[index - 1] : null;

      // Ensure we have valid numbers and prevent division by zero
      const totalPlannedTime = parseFloat(record.dataValues.totalPlannedTime) || 0;
      const totalUptime = parseFloat(record.dataValues.totalUptime) || 0;
      const totalActualRunTime = parseFloat(record.dataValues.totalActualRunTime) || 0;
      const totalGoodPieces = parseInt(record.dataValues.totalGoodPieces) || 0;
      const totalPieces = parseInt(record.dataValues.totalPieces) || 0;

      // Calculate OEE components with proper bounds checking
      const availability = totalPlannedTime > 0 
        ? Math.min((totalUptime / totalPlannedTime) * 100, 100) 
        : 0;
      
      const performance = totalPlannedTime > 0 
        ? Math.min((totalActualRunTime / totalPlannedTime) * 100, 100) 
        : 0;
      
      const quality = totalPieces > 0 
        ? Math.min((totalGoodPieces / totalPieces) * 100, 100) 
        : 0;

      // Calculate OEE as percentage of all three factors
      const OEE = Math.min((availability * performance * quality) / 10000, 100);

      // Quality metrics calculations
      const wasteScrap = parseInt(record.dataValues.totalWasteScrap) || 0;
      const wasteDefect = parseInt(record.dataValues.totalWasteDefect) || 0;
      const wasteRecycled = parseInt(record.dataValues.totalWasteRecycled) || 0;

      // Calculate rates with bounds checking
      const goodRate = totalPieces > 0 ? Math.min((totalGoodPieces / totalPieces * 100), 100) : 0;
      const scrapRate = totalPieces > 0 ? Math.min((wasteScrap / totalPieces * 100), 100) : 0;
      const defectRate = totalPieces > 0 ? Math.min((wasteDefect / totalPieces * 100), 100) : 0;
      const recycleRate = totalPieces > 0 ? Math.min((wasteRecycled / totalPieces * 100), 100) : 0;

      // Production metrics
      const totalProduction = parseInt(record.dataValues.totalProduction) || 0;
      const targetProduction = parseInt(record.dataValues.targetProduction) || 0;

      // Calculate achievement rate with bounds checking
      const achievementRate = targetProduction > 0 
        ? Math.min((totalProduction / targetProduction * 100), 100)
        : 0;

      // Calculate growth from previous day
      const growthPercentage = previousRecord && previousRecord.dataValues.totalProduction > 0
        ? ((totalProduction - previousRecord.dataValues.totalProduction) / previousRecord.dataValues.totalProduction * 100)
        : 0;

      // Calculate other metrics with bounds checking
      const totalManpower = parseFloat(record.dataValues.totalManpower) || 0;
      const totalAllocatedHours = parseFloat(record.dataValues.totalAllocatedHours) || 0;
      const totalRawMaterialInput = parseFloat(record.dataValues.totalRawMaterialInput) || 0;
      const totalRawMaterialOutput = parseFloat(record.dataValues.totalRawMaterialOutput) || 0;
      const totalFinishedGoodStock = parseFloat(record.dataValues.totalFinishedGoodStock) || 0;
      const finishedGoodMinimumRequired = parseFloat(record.dataValues.finishedGoodMinimumRequired) || 0;

      const manpowerUtilization = totalAllocatedHours > 0 
        ? Math.min((totalManpower / totalAllocatedHours * 100), 100)
        : 0;

      const rawMaterialEfficiency = totalRawMaterialInput > 0 
        ? Math.min((totalRawMaterialOutput / totalRawMaterialInput * 100), 100)
        : 0;

      const finishedGoodsRatio = finishedGoodMinimumRequired > 0 
        ? (totalFinishedGoodStock / finishedGoodMinimumRequired * 100)
        : 0;

      return {
        date: record.date,
        availability: availability.toFixed(2),
        performance: performance.toFixed(2),
        quality: quality.toFixed(2),
        OEE: OEE.toFixed(2),
        totalProduction,
        targetProduction,
        achievementRate: achievementRate.toFixed(1),
        growthPercentage: growthPercentage.toFixed(1),
        goodPieces: totalGoodPieces,
        wasteScrap,
        wasteDefect,
        wasteRecycled,
        totalPieces,
        goodRate: goodRate.toFixed(1),
        scrapRate: scrapRate.toFixed(1),
        defectRate: defectRate.toFixed(1),
        recycleRate: recycleRate.toFixed(1),
        manpowerUtilization: manpowerUtilization.toFixed(2),
        rawMaterialUsage: totalRawMaterialInput,
        rawMaterialEfficiency: rawMaterialEfficiency.toFixed(2),
        finishedGoodsStock: totalFinishedGoodStock,
        finishedGoodsRatio: finishedGoodsRatio.toFixed(2),
      };
    });

    res.json(metrics);
  } catch (err) {
    console.error("Error fetching metrics:", err);
    res.status(500).json({ error: 'Error fetching metrics' });
  }
};