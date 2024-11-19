const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection');

const ProductionData = sequelize.define('ProductionData', {

    zoneName: { type: DataTypes.STRING, allowNull: false },
    date: {type: DataTypes.DATE,allowNull: false},
    machineId: { type: DataTypes.STRING, allowNull: false },
    rawMaterialInput: { type: DataTypes.INTEGER, allowNull: false },
    rawMaterialOutput: { type: DataTypes.INTEGER, allowNull: false },
    wasteScrap: { type: DataTypes.INTEGER, allowNull: false },
    wasteDefect: { type: DataTypes.INTEGER, allowNull: false },
    targetProduction: { type: DataTypes.INTEGER, allowNull: true },
    actualProduction: { type: DataTypes.INTEGER, allowNull: true },
    overallProductivity: {type: DataTypes.INTEGER,allowNull: true}
},
{
    tableName: 'machines', 
    timestamps: false,
}
);

module.exports = ProductionData;
