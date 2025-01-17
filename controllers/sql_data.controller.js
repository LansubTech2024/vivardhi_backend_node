const fs = require("fs").promises;
const path = require("path");
const Device = require("../models/sql_data.model");

exports.importMachines = async (req, res) => {
  try {
    const jsonFilePath = path.join(__dirname, "../Data", "new_datas.json");
    const jsonData = await fs.readFile(jsonFilePath, "utf8");
    const data = JSON.parse(jsonData);

    if (!data.zones || !Array.isArray(data.zones)) {
      return res.status(400).json({ error: "Expected zones array in JSON file." });
    }

    const records = [];

    for (const zone of data.zones) {
      for (const monthlyData of zone.monthlyData) {
        // Create flat record matching the schema
        const record = {
          zoneName: zone.zoneName,
          machineId: zone.machineId,
          date: new Date(monthlyData.date),
          
          // Availability data
          actualRunTime: monthlyData.availability?.actualRunTime,
          plannedTime: monthlyData.availability?.plannedTime,
          manpower: monthlyData.availability?.manpower,
          uptime: monthlyData.availability?.uptime,
          totalDowntimeDuration: monthlyData.availability?.downtime?.totalDuration,
          downtimeReasons: monthlyData.availability?.downtime?.reasons?.[0]?.reason,
          
          // Performance data
          totalPieces: monthlyData.performance?.totalPieces,
          target: monthlyData.performance?.target,
          productionRate: monthlyData.performance?.productionRate,
          efficiency: monthlyData.performance?.totalPieces && monthlyData.performance?.target
            ? Math.round((monthlyData.performance.totalPieces / monthlyData.performance.target) * 100)
            : null,
          
          // Quality data
          goodPieces: monthlyData.quality?.goodPieces,
          totalProduction: monthlyData.quality?.totalProduction,
          rawMaterialUsed: monthlyData.quality?.rawMaterialUsed,
          defectRate: monthlyData.quality?.totalProduction && monthlyData.quality?.goodPieces
            ? Math.round(((monthlyData.quality.totalProduction - monthlyData.quality.goodPieces) / monthlyData.quality.totalProduction) * 100)
            : null,
          scrapRate: monthlyData.quality?.scrapRate,
          partRejectionRate: monthlyData.quality?.partRejectionRate,
          
          // Power usage data
          voltage: monthlyData.powerUsage?.voltage,
          current: monthlyData.powerUsage?.current,
          powerConsumed: monthlyData.powerUsage?.powerConsumed,
          totalPowerDowntimeDuration: monthlyData.powerUsage?.downtime?.totalDuration,
          powerDowntimeReasons: monthlyData.powerUsage?.downtime?.reasons?.[0]?.reason,
          energyConsumption: monthlyData.powerUsage?.energyConsumption,
          
          // Material management data
          rawMaterialInput: monthlyData.materialManagement?.rawMaterial?.input,
          rawMaterialOutput: monthlyData.materialManagement?.rawMaterial?.output,
          wasteScrap: monthlyData.materialManagement?.waste?.scrap,
          wasteDefect: monthlyData.materialManagement?.waste?.defect,
          wasteRecycled: monthlyData.materialManagement?.waste?.recycled,
          
          // Inventory analysis data - taking first item from arrays
          rawMaterialId: monthlyData.inventoryAnalysis?.rawMaterials?.[0]?.materialId,
          rawMaterialName: monthlyData.inventoryAnalysis?.rawMaterials?.[0]?.materialName,
          currentStock: monthlyData.inventoryAnalysis?.rawMaterials?.[0]?.currentStock,
          minimumRequired: monthlyData.inventoryAnalysis?.rawMaterials?.[0]?.minimumRequired,
          
          // Finished goods data
          finishedGoodId: monthlyData.inventoryAnalysis?.finishedGoods?.[0]?.productId,
          finishedGoodName: monthlyData.inventoryAnalysis?.finishedGoods?.[0]?.productName,
          finishedGoodCurrentStock: monthlyData.inventoryAnalysis?.finishedGoods?.[0]?.currentStock,
          finishedGoodMinimumRequired: monthlyData.inventoryAnalysis?.finishedGoods?.[0]?.minimumRequired,
          
          // Resource allocation - manpower data
          workerId: monthlyData.resourceAllocation?.manpower?.[0]?.workerId,
          workerName: monthlyData.resourceAllocation?.manpower?.[0]?.workerName,
          role: monthlyData.resourceAllocation?.manpower?.[0]?.role,
          allocatedHours: monthlyData.resourceAllocation?.manpower?.[0]?.allocatedHours,
          workedHours: monthlyData.resourceAllocation?.manpower?.[0]?.workedHours,
          leave: monthlyData.resourceAllocation?.manpower?.[0]?.leave,
          currentShift: monthlyData.resourceAllocation?.manpower?.[0]?.currentShift,
          allocation: monthlyData.resourceAllocation?.manpower?.[0]?.allocation,
          
          // Resource allocation - equipment data
          equipmentId: monthlyData.resourceAllocation?.equipment?.equipmentId,
          equipmentName: monthlyData.resourceAllocation?.equipment?.equipmentName,
          equipmentAllocatedHours: monthlyData.resourceAllocation?.equipment?.allocatedHours,
          utilizationRate: monthlyData.resourceAllocation?.equipment?.utilizationRate,
          spindleSpeed: monthlyData.resourceAllocation?.equipment?.spindleSpeed,
          feedRate: monthlyData.resourceAllocation?.equipment?.feedRate,
          cycleTime: monthlyData.resourceAllocation?.equipment?.cycleTime,
          machineUtilization: monthlyData.resourceAllocation?.equipment?.machineUtilization,
          temperature: monthlyData.resourceAllocation?.equipment?.temperature,
          chuckPressure: monthlyData.resourceAllocation?.equipment?.chuckPressure,
          downtime: monthlyData.resourceAllocation?.equipment?.downtime,
          cutDepth: monthlyData.resourceAllocation?.equipment?.cutDepth,
          materialRemovalRate: monthlyData.resourceAllocation?.equipment?.materialRemovalRate,
          surfaceFinishQuality: monthlyData.resourceAllocation?.equipment?.surfaceFinishQuality,
          
          // Production targets data
          targetProduction: monthlyData.productionTargets?.targetProduction,
          actualProduction: monthlyData.productionTargets?.actualProduction,
          overallProductivity: monthlyData.productionTargets?.overallProductivity,
          
          // Tool management data
          toolInUseId: monthlyData.toolManagement?.toolsInUse?.[0]?.toolId,
          toolInUseName: monthlyData.toolManagement?.toolsInUse?.[0]?.toolName,
          toolInUseUsageTime: monthlyData.toolManagement?.toolsInUse?.[0]?.usageTime,
          toolInUseCondition: monthlyData.toolManagement?.toolsInUse?.[0]?.condition,
          toolInUseTotalOperation: monthlyData.toolManagement?.toolsInUse?.[0]?.productivity?.totalOperations,
          toolInUseSuccessOperation: monthlyData.toolManagement?.toolsInUse?.[0]?.productivity?.successfulOperations,
          toolInUseEfficiency: monthlyData.toolManagement?.toolsInUse?.[0]?.productivity?.efficiency,
          toolLife: monthlyData.toolManagement?.toolsInUse?.[0]?.toolLife,
          toolWear: monthlyData.toolManagement?.toolsInUse?.[0]?.toolWear,
          totalTools: monthlyData.toolManagement?.totalTools,
          toolsAvailable: monthlyData.toolManagement?.toolsAvailable
        };
        
        records.push(record);
      }
    }

    // Insert all records
    await Device.insertMany(records);

    const totalRecords = await Device.countDocuments();

    res.status(201).json({
      success: `${records.length} records successfully inserted into MongoDB!`,
      total_records: totalRecords
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};