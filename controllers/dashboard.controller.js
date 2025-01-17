const MachineData = require('../models/dashboard.model');

exports.getMetrics = async (req, res) => {
  try {
    // Fetch and aggregate data using MongoDB aggregation pipeline
    const data = await MachineData.aggregate([
      {
        $group: {
          _id: "$date",
          totalUptime: { $sum: "$uptime" },
          totalPlannedTime: { $sum: "$plannedTime" },
          totalActualRunTime: { $sum: "$actualRunTime" },
          totalGoodPieces: { $sum: "$goodPieces" },
          totalPieces: { $sum: "$totalPieces" },
          totalWasteScrap: { $sum: "$wasteScrap" },
          totalWasteDefect: { $sum: "$wasteDefect" },
          totalWasteRecycled: { $sum: "$wasteRecycled" },
          totalProduction: { $sum: "$totalProduction" },
          targetProduction: { $sum: "$targetProduction" },
          totalManpower: { $sum: "$manpower" },
          totalAllocatedHours: { $sum: "$allocatedHours" },
          totalRawMaterialInput: { $sum: "$rawMaterialInput" },
          totalRawMaterialOutput: { $sum: "$rawMaterialOutput" },
          totalFinishedGoodStock: { $sum: "$finishedGoodCurrentStock" },
          finishedGoodMinimumRequired: { $sum: "$finishedGoodMinimumRequired" }
        }
      },
      {
        $sort: { _id: 1 } // Sort by date ascending
      }
    ]);

    // Convert aggregated data to array for processing
    const sortedData = data.map(record => ({
      date: record._id,
      ...record
    }));

    // Calculate metrics for each date
    const metrics = sortedData.map((record, index) => {
      const previousRecord = index > 0 ? sortedData[index - 1] : null;

      // Ensure we have valid numbers and prevent division by zero
      const totalPlannedTime = parseFloat(record.totalPlannedTime) || 0;
      const totalUptime = parseFloat(record.totalUptime) || 0;
      const totalActualRunTime = parseFloat(record.totalActualRunTime) || 0;
      const totalGoodPieces = parseInt(record.totalGoodPieces) || 0;
      const totalPieces = parseInt(record.totalPieces) || 0;

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
      const wasteScrap = parseInt(record.totalWasteScrap) || 0;
      const wasteDefect = parseInt(record.totalWasteDefect) || 0;
      const wasteRecycled = parseInt(record.totalWasteRecycled) || 0;

      // Calculate rates with bounds checking
      const goodRate = totalPieces > 0 ? Math.min((totalGoodPieces / totalPieces * 100), 100) : 0;
      const scrapRate = totalPieces > 0 ? Math.min((wasteScrap / totalPieces * 100), 100) : 0;
      const defectRate = totalPieces > 0 ? Math.min((wasteDefect / totalPieces * 100), 100) : 0;
      const recycleRate = totalPieces > 0 ? Math.min((wasteRecycled / totalPieces * 100), 100) : 0;

      // Production metrics
      const totalProduction = parseInt(record.totalProduction) || 0;
      const targetProduction = parseInt(record.targetProduction) || 0;

      // Calculate achievement rate with bounds checking
      const achievementRate = targetProduction > 0 
        ? Math.min((totalProduction / targetProduction * 100), 100)
        : 0;

      // Calculate growth from previous day
      const growthPercentage = previousRecord && previousRecord.totalProduction > 0
        ? ((totalProduction - previousRecord.totalProduction) / previousRecord.totalProduction * 100)
        : 0;

      // Calculate other metrics with bounds checking
      const totalManpower = parseFloat(record.totalManpower) || 0;
      const totalAllocatedHours = parseFloat(record.totalAllocatedHours) || 0;
      const totalRawMaterialInput = parseFloat(record.totalRawMaterialInput) || 0;
      const totalRawMaterialOutput = parseFloat(record.totalRawMaterialOutput) || 0;
      const totalFinishedGoodStock = parseFloat(record.totalFinishedGoodStock) || 0;
      const finishedGoodMinimumRequired = parseFloat(record.finishedGoodMinimumRequired) || 0;

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
        date: record._id,  // Note: Changed from record.date to record._id
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
        totalManpower,
        totalAllocatedHours,
        rawMaterialUsage: totalRawMaterialInput,
        rawMaterialEfficiency: rawMaterialEfficiency.toFixed(2),
        finishedGoodsStock: totalFinishedGoodStock,
        finishedGoodsRatio: finishedGoodsRatio.toFixed(2),
        finishedGoodMinimumRequired
      };
    });

    res.json(metrics);
  } catch (err) {
    console.error("Error fetching metrics:", err);
    res.status(500).json({ error: 'Error fetching metrics' });
  }
};