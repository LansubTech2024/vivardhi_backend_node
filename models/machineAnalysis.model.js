const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection.js');

const Machine = sequelize.define('Machine', {
    machineId: { type: DataTypes.STRING, allowNull: false },
    powerConsumed: { type: DataTypes.INTEGER, allowNull: true },
    actualRunTime: { type: DataTypes.INTEGER, allowNull: true },
    plannedTime: { type: DataTypes.INTEGER, allowNull: true },
    manpower: { type: DataTypes.INTEGER, allowNull: true },
    uptime: { type: DataTypes.INTEGER, allowNull: true },
    totalDowntimeDuration: { type: DataTypes.INTEGER, allowNull: true },
    downtimeReasons: { type: DataTypes.STRING, allowNull: true },
    totalPieces: { type: DataTypes.INTEGER, allowNull: true },
    target: { type: DataTypes.INTEGER, allowNull: true },
    efficiency: { type: DataTypes.INTEGER, allowNull: true },
    goodPieces: { type: DataTypes.INTEGER, allowNull: true },
    rawMaterialUsed: { type: DataTypes.INTEGER, allowNull: true },
    defectRate: { type: DataTypes.INTEGER, allowNull: true },

},{
    tableName: 'factory_data', 
    timestamps: false,
  });

module.exports = Machine;