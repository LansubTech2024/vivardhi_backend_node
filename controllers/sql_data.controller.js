const fs = require("fs").promises;
const path = require("path");
const Device = require("../models/sql_data.model");

exports.importMachines = async (req, res) => {
  try {
    // Specify the data file path manually
    const jsonFilePath = path.join(__dirname, "../Data", "new_datas.json");
    const jsonData = await fs.readFile(jsonFilePath, "utf8");
    const data = JSON.parse(jsonData);

    if (!data.zones || !Array.isArray(data.zones)) {
      return res
        .status(400)
        .json({ error: "Expected zones array in JSON file." });
    }

    const newMachines = new Set(); // Using Set to avoid duplicates

    for (const zone of data.zones) {
      for (const monthlyData of zone.monthlyData) {

        const record = {
          zoneName: zone.zoneName,
          machineId: zone.machineId,
          date: new Date(monthlyData.date),
          actualRunTime: monthlyData.availability?.actualRunTime || null,
          plannedTime: monthlyData.availability?.plannedTime || null,
          manpower: monthlyData.availability?.manpower || null,
          uptime: monthlyData.availability?.uptime || null,
          totalDowntimeDuration:
            monthlyData.availability?.downtime?.totalDuration || null,
          downtimeReasons: monthlyData.availability?.downtime?.reasons?.[0]?.reason || 0,
          totalPieces: monthlyData.performance?.totalPieces || null,
          target: monthlyData.performance?.target || null,
          efficiency:
            monthlyData.performance?.totalPieces &&
            monthlyData.performance?.target
              ? Math.round(
                  (monthlyData.performance.totalPieces /
                    monthlyData.performance.target) *
                    100
                )
              : null,
          goodPieces: monthlyData.quality?.goodPieces || null,
          totalProduction: monthlyData.quality?.totalProduction || null,
          rawMaterialUsed: monthlyData.quality?.rawMaterialUsed || null,
          defectRate:
            monthlyData.quality?.totalProduction &&
            monthlyData.quality?.goodPieces
              ? Math.round(
                  ((monthlyData.quality.totalProduction -
                    monthlyData.quality.goodPieces) /
                    monthlyData.quality.totalProduction) *
                    100
                )
              : null,
          voltage: monthlyData.powerUsage?.voltage || null,
          current: monthlyData.powerUsage?.current || null,
          powerConsumed: monthlyData.powerUsage?.powerConsumed || null,
          totalPowerDowntimeDuration:
            monthlyData.powerUsage?.downtime?.totalDuration || null,
          powerDowntimeReasons: monthlyData.powerUsage?.downtime?.reasons?.[0]?.reason || null,
          rawMaterialInput:
            monthlyData.materialManagement?.rawMaterial?.input || null,
          rawMaterialOutput:
            monthlyData.materialManagement?.rawMaterial?.output || null,
          wasteScrap: monthlyData.materialManagement?.waste?.scrap || null,
          wasteDefect: monthlyData.materialManagement?.waste?.defect || null,
          wasteRecycled:
            monthlyData.materialManagement?.waste?.recycled || null,

          // Inventory data keys
          rawMaterialId:
            monthlyData.inventoryAnalysis?.rawMaterials?.[0]?.materialId ||
            null,
          rawMaterialName:
            monthlyData.inventoryAnalysis?.rawMaterials?.[0]?.materialName ||
            null,
          currentStock:
            monthlyData.inventoryAnalysis?.rawMaterials?.[0]?.currentStock ||
            null,
          minimumRequired:
            monthlyData.inventoryAnalysis?.rawMaterials?.[0]?.minimumRequired ||
            null,

          // Finished Goods
          finishedGoodId:
            monthlyData.inventoryAnalysis?.finishedGoods?.[0]?.productId || null,
          finishedGoodName:
            monthlyData.inventoryAnalysis?.finishedGoods?.[0]?.productName || null,
          finishedGoodCurrentStock:
            monthlyData.inventoryAnalysis?.finishedGoods?.[0]?.currentStock || null,
          finishedGoodMinimumRequired:
            monthlyData.inventoryAnalysis?.finishedGoods?.[0]?.minimumRequired || null,

          // Resource allocation keys
          workerId:
            monthlyData.resourceAllocation?.manpower?.[0]?.workerId || null,
          workerName:
            monthlyData.resourceAllocation?.manpower?.[0]?.workerName || null,
          role: monthlyData.resourceAllocation?.manpower?.[0]?.role || null,
          allocatedHours:
            monthlyData.resourceAllocation?.manpower?.[0]?.allocatedHours ||
            null,
          workedHours:
            monthlyData.resourceAllocation?.manpower?.[0]?.workedHours ||
            null,
          leave:
            monthlyData.resourceAllocation?.manpower?.[0]?.leave ||
            null,
          currentShift:
            monthlyData.resourceAllocation?.manpower?.[0]?.currentShift || null,
          allocation:
            monthlyData.resourceAllocation?.manpower?.[0]?.allocation || null,
          equipmentId:
            monthlyData.resourceAllocation?.equipment?.[0]?.equipmentId || null,
          equipmentName:
            monthlyData.resourceAllocation?.equipment?.[0]?.equipmentName ||
            null,
          equipmentAllocatedHours:
            monthlyData.resourceAllocation?.equipment?.[0]?.allocatedHours ||
            null,
          utilizationRate:
            monthlyData.resourceAllocation?.equipment?.[0]?.utilizationRate ||
            null,

          // Production rate fields
          targetProduction:
            monthlyData.productionTargets?.targetProduction || null,
          actualProduction:
            monthlyData.productionTargets?.actualProduction || null,
          overallProductivity:
            monthlyData.productionTargets?.overallProductivity || null,

          // Tool management fields
          toolInUseId: monthlyData.toolManagement?.toolsInUse?.[0]?.toolId || null,
          toolInUseName:
            monthlyData.toolManagement?.toolsInUse?.[0]?.toolName || null,
          toolInUseUsageTime:
            monthlyData.toolManagement?.toolsInUse?.[0]?.usageTime || null,
          toolInUseCondition:
            monthlyData.toolManagement?.toolsInUse?.[0]?.condition || null,
          toolInUseTotalOperation:monthlyData.toolManagement?.toolsInUse?.[0]?.productivity?.totalOperations || null,
          toolInUseSuccessOperation:monthlyData.toolManagement?.toolsInUse?.[0]?.productivity?.successfulOperations || null,
          toolInUseEfficiency:monthlyData.toolManagement?.toolsInUse?.[0]?.productivity?.efficiency || null,
          totalTools: monthlyData.toolManagement?.totalTools || null,
          toolsAvailable: monthlyData.toolManagement?.toolsAvailable || null,
        };

        // Add record only if it does not have null values for critical fields
        if (Object.values(record).some((value) => value !== null)) {
          newMachines.add(JSON.stringify(record)); // Add unique records
        }
      }
    }

    for (const machine of newMachines) {
      const record = JSON.parse(machine);

      // Insert the record into the database
      await Device.create(record); // Adjust based on your model's create method

      // Wait for 2 seconds before the next insertion
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const totalRecords = await Device.count();

    res.status(201).json({
      success: `${newMachines.size} new records successfully inserted into MySQL!`,
      total_records: totalRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
