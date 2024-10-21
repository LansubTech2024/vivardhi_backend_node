// models/Resource.js
const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Make sure to adjust the path based on your project structure

const ResourceModel = sequelize.define('ResourceModel', {
    name: DataTypes.STRING(100),
    working: DataTypes.INTEGER,
    worked: DataTypes.INTEGER,
    leave: DataTypes.INTEGER,
    working_hours: DataTypes.INTEGER,
    shift: DataTypes.STRING(50),
    allocated: DataTypes.STRING(50),
}, {
    tableName: 'devices', // Use your actual table name
    timestamps: true // No timestamps since you're managing it manually
});

module.exports = ResourceModel;

