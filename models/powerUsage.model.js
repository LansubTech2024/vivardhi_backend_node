
// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection.js');

// const PowerUsage = sequelize.define('PowerUsage', {
//   machineId: { type: DataTypes.STRING, allowNull: false },
//   date: { type: DataTypes.DATEONLY, allowNull: false },
//   powerConsumed: { type: DataTypes.INTEGER, allowNull: true }, 
//   totalPowerDowntimeDuration: { type: DataTypes.INTEGER, allowNull: true },
//   energyConsumption: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   }, 
// },
//  {
//      tableName: 'machines', 
//      timestamps: false,
//    }
// );

// module.exports = PowerUsage;
const mongoose = require('mongoose');

// Define the schema
const PowerUsageSchema = new mongoose.Schema({
    machineId: {
        type: String,
        required: true     // equivalent to allowNull: false
    },
    date: {
        type: Date,
        required: true
    },
    powerConsumed: {
        type: Number,      // equivalent to INTEGER
        required: false    // equivalent to allowNull: true
    },
    totalPowerDowntimeDuration: {
        type: Number,
        required: false
    },
    energyConsumption: {
        type: Number,      // equivalent to FLOAT
        required: false
    }
}, {
    collection: 'machines',  // equivalent to tableName
    timestamps: false        // keeps timestamps disabled
});

// Create and export the model
const PowerUsage = mongoose.model('PowerUsage', PowerUsageSchema);
module.exports = PowerUsage;