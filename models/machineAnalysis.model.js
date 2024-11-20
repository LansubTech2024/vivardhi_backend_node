const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection.js');

const MachineAnalysis = sequelize.define('MachineAnalysis', {
    machineId: { type: DataTypes.STRING, allowNull: false },
    powerConsumed: { type: DataTypes.INTEGER, allowNull: true },
    actualRunTime: { type: DataTypes.INTEGER, allowNull: true },
    plannedTime: { type: DataTypes.INTEGER, allowNull: true },
    manpower: { type: DataTypes.INTEGER, allowNull: true },
    productionRate: { type: DataTypes.INTEGER, allowNull: true },
    scrapRate: { type: DataTypes.INTEGER, allowNull: true },
    partRejectionRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    equipmentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    equipmentName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    equipmentAllocatedHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    utilizationRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spindleSpeed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    feedRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cycleTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    machineUtilization: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    temperature: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    chuckPressure: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    downtime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cutDepth: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    materialRemovalRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    surfaceFinishQuality: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    toolLife: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    toolWear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    energyConsumption: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    

},
 {
  tableName: 'machines', 
  timestamps: true,
  }
);

module.exports = MachineAnalysis;