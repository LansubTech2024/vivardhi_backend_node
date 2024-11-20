const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Import DB connection

// Define the model
const GraphModel = sequelize.define('GraphModel', {
    chw_in_temp: DataTypes.FLOAT,
    chw_out_temp: DataTypes.FLOAT,
    cow_in_temp: DataTypes.FLOAT,
    cow_out_temp: DataTypes.FLOAT,
    vaccum_pr: DataTypes.FLOAT,
    device_date: DataTypes.DATE,
}, {
    tableName: 'devices', 


    timestamps: true

 }
);

module.exports = GraphModel;