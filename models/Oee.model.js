// models/Device.js
const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Update with your database setup file

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
    toolInUseId: { type: DataTypes.STRING, allowNull: true },
    toolInUseName: { type: DataTypes.STRING, allowNull: true },
    toolInUseUsageTime: { type: DataTypes.INTEGER, allowNull: true },
    toolInUseCondition: { type: DataTypes.STRING, allowNull: true },
    totalTools: { type: DataTypes.INTEGER, allowNull: true },
    toolsAvailable: { type: DataTypes.INTEGER, allowNull: true },
    rawMaterialInput: { type: DataTypes.INTEGER, allowNull: false },
    rawMaterialOutput: { type: DataTypes.INTEGER, allowNull: false },
    wasteScrap: { type: DataTypes.INTEGER, allowNull: false },
    wasteDefect: { type: DataTypes.INTEGER, allowNull: false },
    wasteRecycled: { type: DataTypes.INTEGER, allowNull: false },
    workerId: { type: DataTypes.STRING, allowNull: true },
    workerName: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: true },
    allocatedHours: { type: DataTypes.INTEGER, allowNull: true },
    currentShift: { type: DataTypes.STRING, allowNull: true },
    equipmentId: { type: DataTypes.STRING, allowNull: true },
    equipmentName: { type: DataTypes.STRING, allowNull: true },
    equipmentAllocatedHours: { type: DataTypes.INTEGER, allowNull: true },
    utilizationRate: { type: DataTypes.INTEGER, allowNull: true },
    targetProduction: { type: DataTypes.INTEGER, allowNull: true },
    actualProduction: { type: DataTypes.INTEGER, allowNull: true },
    overallProductivity: { type: DataTypes.FLOAT, allowNull: true },
  },

{
    tableName: 'factory_data', // Use your actual table name


    timestamps: false

});

module.exports = Device;
