// models/Device.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Update with your database setup file

const Device = sequelize.define('Device', {
    // Define all fields as you provided above, here’s a brief example
    date: { type: DataTypes.DATE, allowNull: false },
    zoneName: { type: DataTypes.STRING, allowNull: false },
    machineId: { type: DataTypes.STRING, allowNull: false },
    // Other fields...

    // Fields specifically for OEE calculations
    actualRunTime: { type: DataTypes.INTEGER, allowNull: false },
    plannedTime: { type: DataTypes.INTEGER, allowNull: false },
    totalPieces: { type: DataTypes.INTEGER, allowNull: false },
    target: { type: DataTypes.INTEGER, allowNull: false },
    goodPieces: { type: DataTypes.INTEGER, allowNull: false },
    totalProduction: { type: DataTypes.INTEGER, allowNull: false },
    rawMaterialUsed: { type: DataTypes.INTEGER, allowNull: false },
    // Other fields continued...

     // Production and target details
     productionAchieved: { type: DataTypes.INTEGER, allowNull: false },
     productionTarget: { type: DataTypes.INTEGER, allowNull: false },
 
     // Quality and defects
     scrap: { type: DataTypes.INTEGER, allowNull: false },
     defectCount: { type: DataTypes.INTEGER, allowNull: false },
 
     // Manpower allocation
     manpowerAllocated: { type: DataTypes.INTEGER, allowNull: false },
 
     // Inventory details
    
     finishedProductCount: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Device;
