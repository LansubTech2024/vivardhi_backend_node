// models/Resource.js
const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Make sure to adjust the path based on your project structure

const Resource = sequelize.define('Resource', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    working: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    worked: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    leave: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    working_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shift: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    allocated: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: 'temp_table', // Use your actual table name
    timestamps: false // No timestamps since you're managing it manually
});

module.exports = Resource;

