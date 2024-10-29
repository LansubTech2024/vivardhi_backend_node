// models/Device.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Device = sequelize.define('Device', {
  zoneName: { type: DataTypes.STRING, allowNull: false },
  machineId: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  actualRunTime: { type: DataTypes.INTEGER, allowNull: false },
  plannedTime: { type: DataTypes.INTEGER, allowNull: false },
  manpower: { type: DataTypes.INTEGER, allowNull: false },
  uptime: { type: DataTypes.INTEGER, allowNull: false },
  totalDowntimeDuration: { type: DataTypes.INTEGER, allowNull: false },
  maintenanceDowntime: { type: DataTypes.INTEGER, allowNull: false },
  powerOutageDowntime: { type: DataTypes.INTEGER, allowNull: false },
  totalPieces: { type: DataTypes.INTEGER, allowNull: false },
  target: { type: DataTypes.INTEGER, allowNull: false },
  efficiency: { type: DataTypes.INTEGER, allowNull: false },
  goodPieces: { type: DataTypes.INTEGER, allowNull: false },
  totalProduction: { type: DataTypes.INTEGER, allowNull: false },
  rawMaterialUsed: { type: DataTypes.INTEGER, allowNull: false },
  defectRate: { type: DataTypes.INTEGER, allowNull: false },
  voltage: { type: DataTypes.INTEGER, allowNull: false },
  current: { type: DataTypes.INTEGER, allowNull: false },
  powerConsumed: { type: DataTypes.INTEGER, allowNull: false },
  totalPowerDowntimeDuration: { type: DataTypes.INTEGER, allowNull: false },
  // Additional fields...
});

module.exports = Device;
