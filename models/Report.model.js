// // models/ProductionData.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection'); // Ensure you have set up a Sequelize instance in config/database.js

// const ProductionData = sequelize.define('ProductionData', {
//   zoneName: { type: DataTypes.STRING, allowNull: false },
//   machineId: { type: DataTypes.STRING, allowNull: false },
//   date: { type: DataTypes.DATE, allowNull: false },
//   actualRunTime: { type: DataTypes.INTEGER },
//   plannedTime: { type: DataTypes.INTEGER },
//   manpower: { type: DataTypes.INTEGER },
//   uptime: { type: DataTypes.INTEGER },
//   totalDowntimeDuration: { type: DataTypes.INTEGER },
//   downtimeReasons: { type: DataTypes.STRING },
//   totalPieces: { type: DataTypes.INTEGER },
//   target: { type: DataTypes.INTEGER },
//   efficiency: { type: DataTypes.INTEGER },
//   goodPieces: { type: DataTypes.INTEGER },
//   totalProduction: { type: DataTypes.INTEGER },
//   rawMaterialUsed: { type: DataTypes.INTEGER },
//   defectRate: { type: DataTypes.INTEGER },
//   voltage: { type: DataTypes.INTEGER },
//   current: { type: DataTypes.INTEGER },
//   powerConsumed: { type: DataTypes.INTEGER },
//   totalPowerDowntimeDuration: { type: DataTypes.INTEGER },
//   powerDowntimeReasons: { type: DataTypes.STRING },
//   rawMaterialInput: { type: DataTypes.INTEGER },
//   rawMaterialOutput: { type: DataTypes.INTEGER },
//   wasteScrap: { type: DataTypes.INTEGER },
//   wasteDefect: { type: DataTypes.INTEGER },
//   wasteRecycled: { type: DataTypes.INTEGER },
//   // Inventory
//   rawMaterialId: { type: DataTypes.STRING },
//   rawMaterialName: { type: DataTypes.STRING },
//   currentStock: { type: DataTypes.INTEGER },
//   minimumRequired: { type: DataTypes.INTEGER },
//   // Finished Goods
//   finishedGoodId: { type: DataTypes.STRING },
//   finishedGoodName: { type: DataTypes.STRING },
//   finishedGoodCurrentStock: { type: DataTypes.INTEGER },
//   finishedGoodMinimumRequired: { type: DataTypes.INTEGER },
//   // Resource allocation
//   workerId: { type: DataTypes.STRING },
//   workerName: { type: DataTypes.STRING },
//   role: { type: DataTypes.STRING },
//   allocatedHours: { type: DataTypes.INTEGER },
//   workedHours: { type: DataTypes.INTEGER },
//   leave: { type: DataTypes.INTEGER },
//   currentShift: { type: DataTypes.STRING },
//   allocation: { type: DataTypes.STRING },
//   equipmentId: { type: DataTypes.STRING },
//   equipmentName: { type: DataTypes.STRING },
//   equipmentAllocatedHours: { type: DataTypes.INTEGER },
//   utilizationRate: { type: DataTypes.INTEGER },
//   // Production rate fields
//   targetProduction: { type: DataTypes.INTEGER },
//   actualProduction: { type: DataTypes.INTEGER },
//   overallProductivity: { type: DataTypes.INTEGER },
//   // Tool management
//   toolInUseId: { type: DataTypes.STRING },
//   toolInUseName: { type: DataTypes.STRING },
//   toolInUseUsageTime: { type: DataTypes.INTEGER },
//   toolInUseCondition: { type: DataTypes.STRING },
//   toolInUseTotalOperation: { type: DataTypes.INTEGER },
//   toolInUseSuccessOperation: { type: DataTypes.INTEGER },
//   toolInUseEfficiency: { type: DataTypes.INTEGER },
//   totalTools: { type: DataTypes.INTEGER },
//   toolsAvailable: { type: DataTypes.INTEGER }
// },
//   {
//    tableName: 'factory_data', 

//   timestamps: false
//  }
// );

// module.exports = ProductionData;

const mongoose = require('mongoose');

const productionDataSchema = new mongoose.Schema({
    // Basic information
    zoneName: {
        type: String,
        required: true
    },
    machineId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // Operation metrics
    actualRunTime: {
        type: Number
    },
    plannedTime: {
        type: Number
    },
    manpower: {
        type: Number
    },
    uptime: {
        type: Number
    },
    totalDowntimeDuration: {
        type: Number
    },
    downtimeReasons: {
        type: String
    },
    totalPieces: {
        type: Number
    },
    target: {
        type: Number
    },
    efficiency: {
        type: Number
    },
    goodPieces: {
        type: Number
    },
    totalProduction: {
        type: Number
    },
    rawMaterialUsed: {
        type: Number
    },
    defectRate: {
        type: Number
    },
    // Power metrics
    voltage: {
        type: Number
    },
    current: {
        type: Number
    },
    powerConsumed: {
        type: Number
    },
    totalPowerDowntimeDuration: {
        type: Number
    },
    powerDowntimeReasons: {
        type: String
    },
    // Material metrics
    rawMaterialInput: {
        type: Number
    },
    rawMaterialOutput: {
        type: Number
    },
    wasteScrap: {
        type: Number
    },
    wasteDefect: {
        type: Number
    },
    wasteRecycled: {
        type: Number
    },
    // Inventory information
    rawMaterialId: {
        type: String
    },
    rawMaterialName: {
        type: String
    },
    currentStock: {
        type: Number
    },
    minimumRequired: {
        type: Number
    },
    // Finished Goods information
    finishedGoodId: {
        type: String
    },
    finishedGoodName: {
        type: String
    },
    finishedGoodCurrentStock: {
        type: Number
    },
    finishedGoodMinimumRequired: {
        type: Number
    },
    // Resource allocation
    workerId: {
        type: String
    },
    workerName: {
        type: String
    },
    role: {
        type: String
    },
    allocatedHours: {
        type: Number
    },
    workedHours: {
        type: Number
    },
    leave: {
        type: Number
    },
    currentShift: {
        type: String
    },
    allocation: {
        type: String
    },
    equipmentId: {
        type: String
    },
    equipmentName: {
        type: String
    },
    equipmentAllocatedHours: {
        type: Number
    },
    utilizationRate: {
        type: Number
    },
    // Production rate
    targetProduction: {
        type: Number
    },
    actualProduction: {
        type: Number
    },
    overallProductivity: {
        type: Number
    },
    // Tool management
    toolInUseId: {
        type: String
    },
    toolInUseName: {
        type: String
    },
    toolInUseUsageTime: {
        type: Number
    },
    toolInUseCondition: {
        type: String
    },
    toolInUseTotalOperation: {
        type: Number
    },
    toolInUseSuccessOperation: {
        type: Number
    },
    toolInUseEfficiency: {
        type: Number
    },
    totalTools: {
        type: Number
    },
    toolsAvailable: {
        type: Number
    }
},{
    collection: 'machines',  // equivalent to tableName
    timestamps: false       // keeps timestamps disabled as in original
});

const ProductionData = mongoose.model('ProductionData2', productionDataSchema);

module.exports = ProductionData;
