const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Import DB connection

// Define the model
const DetailedGraphModel = sequelize.define('DetailedGraphModel', {
    chw_in_temp: {
        type: DataTypes.FLOAT,
        field: 'chw_in_temp'
      },
      chw_out_temp: {
        type: DataTypes.FLOAT,
        field: 'chw_out_temp'
      },
      cow_in_temp: {
        type: DataTypes.FLOAT,
        field: 'cow_in_temp'
      },
      cow_out_temp: {
        type: DataTypes.FLOAT,
        field: 'cow_out_temp'
      },
      vaccum_pr: {
        type: DataTypes.FLOAT,
        field: 'vaccum_pr'
      },
      device_date: {
        type: DataTypes.DATE,
        field: 'device_date'
      }
}, 
{
     tableName: 'devices', 

    timestamps: true

}
);

module.exports = DetailedGraphModel;