const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Device = sequelize.define('Device', {
    // Your existing columns here...
    zoneName: { type: DataTypes.STRING, allowNull: false },
    rawMaterialInput: { type: DataTypes.INTEGER, allowNull: false },
    rawMaterialOutput: { type: DataTypes.INTEGER, allowNull: false },
    wasteScrap: { type: DataTypes.INTEGER, allowNull: false },
    wasteDefect: { type: DataTypes.INTEGER, allowNull: false },
    actualProduction: { type: DataTypes.INTEGER, allowNull: true },
    // More columns as required
});

module.exports = Device;
