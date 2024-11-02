// models/Inventory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection.js'); // Assuming you have a configured database instance

const Inventory = sequelize.define('Inventory', {
  rawMaterialId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rawMaterialName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  currentStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  minimumRequired: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  finishedGoodId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  finishedGoodName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  finishedGoodCurrentStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  finishedGoodMinimumRequired: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'factory_data',
  timestamps: false,
});

module.exports = Inventory;
