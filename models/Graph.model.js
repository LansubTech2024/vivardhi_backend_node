const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database connection

const GraphModel = sequelize.define('GraphModel', {
    device_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    chw_in_temp: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    chw_out_temp: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    cow_in_temp: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    cow_out_temp: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    vaccum_pr: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'graph_models' // Update with your actual table name
});

module.exports = GraphModel;
