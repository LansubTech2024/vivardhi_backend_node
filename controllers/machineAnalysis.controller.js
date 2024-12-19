
const Machine = require('../models/machineAnalysis.model');
const sequelize = require("../DB_connection/db_connection");

exports.getAverageMachineData = async (req, res) => {
  try {
    // Fetch and calculate average values for each machine by zone
    const averageData = await Machine.findAll({
      attributes: [
        "zoneName",
        "machineId",
        [sequelize.fn('AVG', sequelize.col('productionRate')), 'avgProductionRate'],
        [sequelize.fn('AVG', sequelize.col('scrapRate')), 'avgScrapRate'],
        [sequelize.fn('AVG', sequelize.col('downtime')), 'avgDowntime'],
        [sequelize.fn('AVG', sequelize.col('temperature')), 'avgTemperature'],
        [sequelize.fn('AVG', sequelize.col('energyConsumption')), 'avgEnergyConsumption'],
      ],
      group: ['zoneName', 'machineId'],  // Group by zone and machineId
      order: [["zoneName", "ASC"], ["machineId", "ASC"]],  // Optional: Order results by zone and machineId
    });

    // Format the averages to 2 decimal places using toFixed()
    const formattedData = averageData.map(item => {
      return {
        zone: item.zoneName,
        machineId: item.machineId,
        avgProductionRate: parseFloat(item.dataValues.avgProductionRate).toFixed(2),
        avgScrapRate: parseFloat(item.dataValues.avgScrapRate).toFixed(2),
        avgDowntime: parseFloat(item.dataValues.avgDowntime).toFixed(2),
        avgTemperature: parseFloat(item.dataValues.avgTemperature).toFixed(2),
        avgEnergyConsumption: parseFloat(item.dataValues.avgEnergyConsumption).toFixed(2),
      };
    });

    // Send the formatted data as a response
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching machine data", error });
  }
};
  
  // Get detailed data for a specific machine
  exports.getMachineDetails = async (req, res) => {
    const { id } = req.params;
    try {
      const machines = await Machine.findAll({
        where: { machineId: id },
        attributes: [
          "machineId",
          "zoneName",
          "equipmentName",
          [sequelize.fn("AVG", sequelize.col("spindleSpeed")), "avgSpindleSpeed"],
          [sequelize.fn("AVG", sequelize.col("partRejectionRate")), "avgPartRejectionRate"],
          [sequelize.fn("AVG", sequelize.col("utilizationRate")), "avgUtilizationRate"],
          [sequelize.fn("AVG", sequelize.col("feedRate")), "avgFeedRate"],
          [sequelize.fn("AVG", sequelize.col("cycleTime")), "avgCycleTime"],
          [sequelize.fn("AVG", sequelize.col("machineUtilization")), "avgMachineUtilization"],
          [sequelize.fn("AVG", sequelize.col("temperature")), "avgTemperature"],
          [sequelize.fn("AVG", sequelize.col("chuckPressure")), "avgChuckPressure"],
          [sequelize.fn("AVG", sequelize.col("downtime")), "avgDowntime"],
          [sequelize.fn("AVG", sequelize.col("cutDepth")), "avgCutDepth"],
          [sequelize.fn("AVG", sequelize.col("materialRemovalRate")), "avgMaterialRemovalRate"],
          [sequelize.fn("AVG", sequelize.col("surfaceFinishQuality")), "avgSurfaceFinishQuality"],
          [sequelize.fn("AVG", sequelize.col("toolLife")), "avgToolLife"],
          [sequelize.fn("AVG", sequelize.col("toolWear")), "avgToolWear"]
        ],
        group: ['zoneName', 'machineId', 'equipmentName'], // Group by machineId to calculate averages for each machine
        order: [["zoneName", "ASC"], ["machineId", "ASC"], ["equipmentName", "ASC"]],
      });
  
      if (machines.length > 0) {
        // Apply toFixed to each average value
      const formattedMachine = machines.map((m) => ({
        machineId: m.machineId,
        zone: m.zoneName,
        equipmentName: m.equipmentName,
        avgSpindleSpeed: parseFloat(m.dataValues.avgSpindleSpeed).toFixed(2),
        avgPartRejectionRate: parseFloat(m.dataValues.avgPartRejectionRate).toFixed(2),
        avgUtilizationRate: parseFloat(m.dataValues.avgUtilizationRate).toFixed(2),
        avgFeedRate: parseFloat(m.dataValues.avgFeedRate).toFixed(2),
        avgCycleTime: parseFloat(m.dataValues.avgCycleTime).toFixed(2),
        avgMachineUtilization: parseFloat(m.dataValues.avgMachineUtilization).toFixed(2),
        avgTemperature: parseFloat(m.dataValues.avgTemperature).toFixed(2),
        avgChuckPressure: parseFloat(m.dataValues.avgChuckPressure).toFixed(2),
        avgDowntime: parseFloat(m.dataValues.avgDowntime).toFixed(2),
        avgCutDepth: parseFloat(m.dataValues.avgCutDepth).toFixed(2),
        avgMaterialRemovalRate: parseFloat(m.dataValues.avgMaterialRemovalRate).toFixed(2),
        avgSurfaceFinishQuality: parseFloat(m.dataValues.avgSurfaceFinishQuality).toFixed(2),
        avgToolLife: parseFloat(m.dataValues.avgToolLife).toFixed(2),
        avgToolWear: parseFloat(m.dataValues.avgToolWear).toFixed(2),
      }));

      res.json(formattedMachine);
      } else {
        res.status(404).json({ message: "No machines found for this zone" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching machine details by zone", error });
    }
  };