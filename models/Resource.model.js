// // models/Resource.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection'); // Make sure to adjust the path based on your project structure

// const ResourceModel = sequelize.define('ResourceModel', {
//     name: DataTypes.STRING(100),

        
//     working:DataTypes.INTEGER,
        
//     worked: DataTypes.INTEGER,
        
//     leave: DataTypes.INTEGER,
        
//     working_hours:DataTypes.INTEGER,
       
//     shift:  DataTypes.STRING(50),
        
//     allocated: DataTypes.STRING(50),
        
// }, 
//  {
//     tableName: 'devices', // Use your actual table name
//     timestamps: false // No timestamps since you're managing it manually

// }
// );

// module.exports = ResourceModel;

const mongoose = require('mongoose');

// Define the schema
const ResourceSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100
    },
    working: {
        type: Number,
        min: 0
    },
    worked: {
        type: Number,
        min: 0
    },
    leave: {
        type: Number,
        min: 0
    },
    working_hours: {
        type: Number,
        min: 0
    },
    shift: {
        type: String,
        maxLength: 50
    },
    allocated: {
        type: String,
        maxLength: 50
    }
}, {
    collection: 'Machines',  // equivalent to tableName
    timestamps: false       // keeps timestamps disabled as in original
});

// Create and export the model
const ResourceModel = mongoose.model('ResourceModel', ResourceSchema);
module.exports = ResourceModel;