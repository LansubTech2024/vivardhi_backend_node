const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Ensure this path is correct


const Device = sequelize.define('Device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    chw_in_temp: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    chw_out_temp: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cow_in_temp: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cow_out_temp: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    vaccum_pr: {
        type: DataTypes.FLOAT,

        allowNull: false,

    },
    name: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    allocated: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    device_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

});

module.exports = Device;
