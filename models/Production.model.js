// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection');

// const ProductionData = sequelize.define('ProductionData', {

//     zoneName: { type: DataTypes.STRING, allowNull: false },
//     date: {type: DataTypes.DATE,allowNull: false},
//     machineId: { type: DataTypes.STRING, allowNull: false },
//     rawMaterialInput: { type: DataTypes.INTEGER, allowNull: false },
//     rawMaterialOutput: { type: DataTypes.INTEGER, allowNull: false },
//     wasteScrap: { type: DataTypes.INTEGER, allowNull: false },
//     wasteDefect: { type: DataTypes.INTEGER, allowNull: false },
//     targetProduction: { type: DataTypes.INTEGER, allowNull: true },
//     actualProduction: { type: DataTypes.INTEGER, allowNull: true },
//     overallProductivity: {type: DataTypes.INTEGER,allowNull: true}
// },
// {
//     tableName: 'machines', 
//     timestamps: false,
// }
// );

// module.exports = ProductionData;

const mongoose = require('mongoose');

const productionDataSchema = new mongoose.Schema({
    zoneName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    machineId: {
        type: String,
        required: true
    },
    rawMaterialInput: {
        type: Number,
        required: true
    },
    rawMaterialOutput: {
        type: Number,
        required: true
    },
    wasteScrap: {
        type: Number,
        required: true
    },
    wasteDefect: {
        type: Number,
        required: true
    },
    targetProduction: {
        type: Number,
        required: false
    },
    actualProduction: {
        type: Number,
        required: false
    },
    overallProductivity: {
        type: Number,
        required: false
    }
}, {
    collection: 'machines',
    timestamps: false
});

const ProductionData = mongoose.model('ProductionData1', productionDataSchema);

module.exports = ProductionData;