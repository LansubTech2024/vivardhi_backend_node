const Machine = require('../models/machineAnalysis.model');

exports.getAverageMachineData = async (req, res) => {
  try {
    // Fetch and calculate average values for each machine by zone using MongoDB aggregation
    const averageData = await Machine.aggregate([
      {
        $group: {
          _id: {
            zoneName: "$zoneName",
            machineId: "$machineId"
          },
          avgProductionRate: { $avg: "$productionRate" },
          avgScrapRate: { $avg: "$scrapRate" },
          avgDowntime: { $avg: "$downtime" },
          avgTemperature: { $avg: "$temperature" },
          avgEnergyConsumption: { $avg: "$energyConsumption" }
        }
      },
      {
        $sort: {
          "_id.zoneName": 1,
          "_id.machineId": 1
        }
      }
    ]);

    if (!averageData || averageData.length === 0) {
      return res.status(404).json({ message: "No machine data found" });
    }

    // Format the averages to 2 decimal places
    const formattedData = averageData.map(item => ({
      zone: item._id.zoneName,
      machineId: item._id.machineId,
      avgProductionRate: Number(item.avgProductionRate?.toFixed(2) || 0),
      avgScrapRate: Number(item.avgScrapRate?.toFixed(2) || 0),
      avgDowntime: Number(item.avgDowntime?.toFixed(2) || 0),
      avgTemperature: Number(item.avgTemperature?.toFixed(2) || 0),
      avgEnergyConsumption: Number(item.avgEnergyConsumption?.toFixed(2) || 0)
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error in getAverageMachineData:", error);
    res.status(500).json({ 
      message: "Error fetching machine data", 
      error: error.message 
    });
  }
};

exports.getMachineDetails = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Add validation for machineId
    if (!id) {
      return res.status(400).json({ message: "Machine ID is required" });
    }

    const machines = await Machine.aggregate([
      {
        // Convert string ID to the correct type if needed
        $match: { machineId: id }
      },
      {
        $group: {
          _id: {
            zoneName: "$zoneName",
            machineId: "$machineId",
            equipmentName: "$equipmentName"
          },
          avgSpindleSpeed: { $avg: "$spindleSpeed" },
          avgPartRejectionRate: { $avg: "$partRejectionRate" },
          avgUtilizationRate: { $avg: "$utilizationRate" },
          avgFeedRate: { $avg: "$feedRate" },
          avgCycleTime: { $avg: "$cycleTime" },
          avgMachineUtilization: { $avg: "$machineUtilization" },
          avgTemperature: { $avg: "$temperature" },
          avgChuckPressure: { $avg: "$chuckPressure" },
          avgDowntime: { $avg: "$downtime" },
          avgCutDepth: { $avg: "$cutDepth" },
          avgMaterialRemovalRate: { $avg: "$materialRemovalRate" },
          avgSurfaceFinishQuality: { $avg: "$surfaceFinishQuality" },
          avgToolLife: { $avg: "$toolLife" },
          avgToolWear: { $avg: "$toolWear" }
        }
      },
      {
        $sort: {
          "_id.zoneName": 1,
          "_id.machineId": 1,
          "_id.equipmentName": 1
        }
      }
    ]);

    if (!machines || machines.length === 0) {
      return res.status(404).json({ 
        message: `No machine found with ID: ${id}` 
      });
    }

    const formattedMachine = machines.map(m => ({
      machineId: m._id.machineId,
      zone: m._id.zoneName,
      equipmentName: m._id.equipmentName,
      avgSpindleSpeed: Number(m.avgSpindleSpeed?.toFixed(2) || 0),
      avgPartRejectionRate: Number(m.avgPartRejectionRate?.toFixed(2) || 0),
      avgUtilizationRate: Number(m.avgUtilizationRate?.toFixed(2) || 0),
      avgFeedRate: Number(m.avgFeedRate?.toFixed(2) || 0),
      avgCycleTime: Number(m.avgCycleTime?.toFixed(2) || 0),
      avgMachineUtilization: Number(m.avgMachineUtilization?.toFixed(2) || 0),
      avgTemperature: Number(m.avgTemperature?.toFixed(2) || 0),
      avgChuckPressure: Number(m.avgChuckPressure?.toFixed(2) || 0),
      avgDowntime: Number(m.avgDowntime?.toFixed(2) || 0),
      avgCutDepth: Number(m.avgCutDepth?.toFixed(2) || 0),
      avgMaterialRemovalRate: Number(m.avgMaterialRemovalRate?.toFixed(2) || 0),
      avgSurfaceFinishQuality: Number(m.avgSurfaceFinishQuality?.toFixed(2) || 0),
      avgToolLife: Number(m.avgToolLife?.toFixed(2) || 0),
      avgToolWear: Number(m.avgToolWear?.toFixed(2) || 0)
    }));

    res.json(formattedMachine);
  } catch (error) {
    console.error("Error in getMachineDetails:", error);
    res.status(500).json({ 
      message: "Error fetching machine details", 
      error: error.message 
    });
  }
};