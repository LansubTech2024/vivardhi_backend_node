const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Adjust the path to your db configuration file

const Device = sequelize.define('Device', {
    machineId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zoneName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actualRunTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    plannedTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPieces: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    target: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    goodPieces: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalProduction: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'devices',
    timestamps: false
});

module.exports = Device;
