// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection'); // Import DB connection

// // Define the model
// const GraphModel = sequelize.define('GraphModel', {
//     chw_in_temp: DataTypes.FLOAT,
//     chw_out_temp: DataTypes.FLOAT,
//     cow_in_temp: DataTypes.FLOAT,
//     cow_out_temp: DataTypes.FLOAT,
//     vaccum_pr: DataTypes.FLOAT,
//     device_date: DataTypes.DATE,
// }, {
//     tableName: 'devices', 


//     timestamps: true

//  }
// );

// module.exports = GraphModel;

// const mongoose = require('mongoose');

// // Define the schema
// const GraphSchema = new mongoose.Schema({
//     chw_in_temp: {
//         type: Number,
//         required: false
//     },
//     chw_out_temp: {
//         type: Number,
//         required: false
//     },
//     cow_in_temp: {
//         type: Number,
//         required: false
//     },
//     cow_out_temp: {
//         type: Number,
//         required: false
//     },
//     vaccum_pr: {
//         type: Number,
//         required: false
//     },
//     device_date: {
//         type: Date,
//         required: false
//     }
// }, {
//     collection: 'devices',
//     timestamps: true  // This will add createdAt and updatedAt fields
// });

// // Create and export the model
// const GraphModel = mongoose.model('GraphModel', GraphSchema);
// module.exports = GraphModel;