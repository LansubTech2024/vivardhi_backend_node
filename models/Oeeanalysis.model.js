// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection'); // Adjust this path to your database configuration

// const Device = sequelize.define('Device', {
//     zoneName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     machineId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     actualRunTime: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     plannedTime: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     manpower: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     uptime: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     totalDowntimeDuration: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     downtimeReasons: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     totalPieces: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     target: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     efficiency: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     goodPieces: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     totalProduction: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     rawMaterialUsed: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     defectRate: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     wasteScrap: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     wasteDefect: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     // Add more fields as needed based on your requirements
// },
//  {
//     tableName: 'machines',
//    timestamps: false,
//  }
// );

// module.exports = Device;

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
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
    actualRunTime: {
        type: Number,
        required: false
    },
    plannedTime: {
        type: Number,
        required: false
    },
    manpower: {
        type: Number,
        required: false
    },
    uptime: {
        type: Number,
        required: false
    },
    totalDowntimeDuration: {
        type: Number,
        required: false
    },
    downtimeReasons: {
        type: String,
        required: false
    },
    totalPieces: {
        type: Number,
        required: false
    },
    target: {
        type: Number,
        required: false
    },
    efficiency: {
        type: Number,
        required: false
    },
    goodPieces: {
        type: Number,
        required: false
    },
    totalProduction: {
        type: Number,
        required: false
    },
    rawMaterialUsed: {
        type: Number,
        required: false
    },
    defectRate: {
        type: Number,
        required: false
    },
    wasteScrap: {
        type: Number,
        required: false
    },
    wasteDefect: {

        type: Number,
        required: false
    }
}, {
    collection: 'machines',
    timestamps: false
});


const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;