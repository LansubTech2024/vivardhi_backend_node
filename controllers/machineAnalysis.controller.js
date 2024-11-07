
const Machine = require('../models/machineAnalysis.model');
const sequelize = require("../DB_connection/db_connection");


// Get average values for each machine
exports.getAverageMachineData = async (req, res) => {
    try {
      const machines = await Machine.findAll({
        attributes: [
          "machineId",
          [sequelize.fn("AVG", sequelize.col("productionRate")), "averageProductionRate"],
          [sequelize.fn("AVG", sequelize.col("scrapRate")), "averageScrapRate"],
          [sequelize.fn("AVG", sequelize.col("downtime")), "averageDowntime"]
        ],
        group: ["machineId"]
      });
      res.json(machines);
    } catch (error) {
      res.status(500).json({ message: "Error fetching average data", error });
    }
  };
  
  // Get detailed data for a specific machine
  exports.getMachineDetails = async (req, res) => {
    const { id } = req.params;
    try {
      const machine = await Machine.findOne({ where: { machineId: id } });
      if (machine) {
        res.json(machine);
      } else {
        res.status(404).json({ message: "Machine not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching machine details", error });
    }
  };