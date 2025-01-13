const Inventory = require('../models/inventory.model');

exports.getInventoryData = async (req, res) => {
  try {
    const inventoryData = await Inventory.find({});
    res.status(200).json(inventoryData);
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({ error: 'Failed to fetch inventory data' });
  }
};