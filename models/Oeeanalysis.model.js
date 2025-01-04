const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Adjust this path to your database configuration

const Device = sequelize.define('Device', {
    zoneName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    machineId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    actualRunTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    plannedTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    manpower: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    uptime: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    totalDowntimeDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    downtimeReasons: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    totalPieces: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    target: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    efficiency: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    goodPieces: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    totalProduction: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rawMaterialUsed: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    defectRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    wasteScrap: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    wasteDefect: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    
},
 {
    tableName: 'machines',
   timestamps: false,
 }
);

module.exports = Device;
