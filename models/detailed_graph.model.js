// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection'); // Import DB connection

// // Define the model
// const DetailedGraphModel = sequelize.define('DetailedGraphModel', {
//     chw_in_temp: {
//         type: DataTypes.FLOAT,
//         field: 'chw_in_temp'
//       },
//       chw_out_temp: {
//         type: DataTypes.FLOAT,
//         field: 'chw_out_temp'
//       },
//       cow_in_temp: {
//         type: DataTypes.FLOAT,
//         field: 'cow_in_temp'
//       },
//       cow_out_temp: {
//         type: DataTypes.FLOAT,
//         field: 'cow_out_temp'
//       },
//       vaccum_pr: {
//         type: DataTypes.FLOAT,
//         field: 'vaccum_pr'
//       },
//       device_date: {
//         type: DataTypes.DATE,
//         field: 'device_date'
//       }
// }, 
// {
//      tableName: 'devices', 

//     timestamps: true

// }
// );

// module.exports = DetailedGraphModel;
// const mongoose = require('mongoose');

// // Define the schema
// const DetailedGraphSchema = new mongoose.Schema({
//     chw_in_temp: {
//         type: Number    // equivalent to FLOAT
//     },
//     chw_out_temp: {
//         type: Number
//     },
//     cow_in_temp: {
//         type: Number
//     },
//     cow_out_temp: {
//         type: Number
//     },
//     vaccum_pr: {
//         type: Number
//     },
//     device_date: {
//         type: Date
//     }
// }, {
//     collection: 'devices',  // equivalent to tableName
//     timestamps: true       // keeps the timestamps functionality
// });

// // Create and export the model
// const DetailedGraphModel = mongoose.model('DetailedGraphModel', DetailedGraphSchema);
// module.exports = DetailedGraphModel;