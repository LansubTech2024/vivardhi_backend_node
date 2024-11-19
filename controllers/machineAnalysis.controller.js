
const Machine = require('../models/machineAnalysis.model');
const sequelize = require("../DB_connection/db_connection");

exports.getAverageMachineData = async (req, res) => {
  try {
    // Fetch actual data for all machines
    const machines = await Machine.findAll({
      attributes: [
        "machineId",
        "productionRate",
        "scrapRate",
        "downtime",
        "temperature",
        "energyConsumption",
      ],
      order: [["createdAt", "ASC"]], 
    });

    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching machine data", error });
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