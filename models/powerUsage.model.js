
const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection.js');

const PowerUsage = sequelize.define('PowerUsage', {
  machineId: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  powerConsumed: { type: DataTypes.INTEGER, allowNull: true }, 
  totalPowerDowntimeDuration: { type: DataTypes.INTEGER, allowNull: true }, 
},
{
    tableName: 'factory_data', // Set the actual table name in your database
    timestamps: false,
  });

module.exports = PowerUsage;
