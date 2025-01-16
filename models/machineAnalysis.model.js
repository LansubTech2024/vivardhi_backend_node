// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection.js');

// const MachineAnalysis = sequelize.define('MachineAnalysis', {
//   zoneName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//     machineId: { type: DataTypes.STRING, allowNull: false },
//     powerConsumed: { type: DataTypes.INTEGER, allowNull: true },
//     actualRunTime: { type: DataTypes.INTEGER, allowNull: true },
//     plannedTime: { type: DataTypes.INTEGER, allowNull: true },
//     manpower: { type: DataTypes.INTEGER, allowNull: true },
//     productionRate: { type: DataTypes.INTEGER, allowNull: true },
//     scrapRate: { type: DataTypes.INTEGER, allowNull: true },
//     partRejectionRate: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     equipmentId: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     equipmentName: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     equipmentAllocatedHours: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     utilizationRate: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     spindleSpeed: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     feedRate: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     cycleTime: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     machineUtilization: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     temperature: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     chuckPressure: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     downtime: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     cutDepth: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     materialRemovalRate: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     surfaceFinishQuality: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     toolLife: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     toolWear: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     energyConsumption: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
    

// },
//  {
//   tableName: 'machines', 
//   timestamps: true,
//   }
// );

// module.exports = MachineAnalysis;

const mongoose = require('mongoose');

const machineAnalysisSchema = new mongoose.Schema({
   zoneName: {
       type: String,
       required: true
   },
   machineId: {
       type: String,
       required: true
   },
   powerConsumed: {
       type: Number
   },
   actualRunTime: {
       type: Number
   },
   plannedTime: {
       type: Number
   },
   manpower: {
       type: Number
   },
   productionRate: {
       type: Number
   },
   scrapRate: {
       type: Number
   },
   partRejectionRate: {
       type: Number
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
   spindleSpeed: {
       type: Number
   },
   feedRate: {
       type: Number
   },
   cycleTime: {
       type: Number
   },
   machineUtilization: {
       type: Number
   },
   temperature: {
       type: Number
   },
   chuckPressure: {
       type: Number
   },
   downtime: {
       type: Number
   },
   cutDepth: {
       type: Number
   },
   materialRemovalRate: {
       type: Number
   },
   surfaceFinishQuality: {
       type: Number
   },
   toolLife: {
       type: Number
   },
   toolWear: {
       type: Number
   },
   energyConsumption: {
       type: Number
   }
}, {
   collection: 'machines',
   timestamps: true
});

const MachineAnalysis = mongoose.model('MachineAnalysis', machineAnalysisSchema);

module.exports = MachineAnalysis;