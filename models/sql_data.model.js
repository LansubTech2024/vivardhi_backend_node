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
    },
    chw_out_temp: {
        type: DataTypes.FLOAT,
    },
    cow_in_temp: {
        type: DataTypes.FLOAT,
    },
    cow_out_temp: {
        type: DataTypes.FLOAT,
    },
    vaccum_pr: {
        type: DataTypes.FLOAT,
    name: {
        type: DataTypes.STRING,
    },
    working: {
        type: DataTypes.INTEGER,
    },
    worked: {
        type: DataTypes.INTEGER,
    },
    leave: {
        type: DataTypes.INTEGER,
    },
    working_hours: {
        type: DataTypes.INTEGER,
    },
    shift: {
        type: DataTypes.STRING,
    },
    allocated: {
        type: DataTypes.STRING,
    },
    device_date: {
        type: DataTypes.DATE,
    },

},

    tableName: 'temp_table',
    timestamps: true,
});

module.exports = Device;
