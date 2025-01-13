
// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection.js'); // Assuming you have a configured database instance

// const Inventory = sequelize.define('Inventory', {
//   rawMaterialId: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   rawMaterialName: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   currentStock: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   minimumRequired: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   finishedGoodId: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   finishedGoodName: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   finishedGoodCurrentStock: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   finishedGoodMinimumRequired: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
// },
//  {
//   tableName: 'machines',
//   timestamps: false,
//  }
// );

// module.exports = Inventory;

const mongoose = require('mongoose');

// Define the schema
const InventorySchema = new mongoose.Schema({
    rawMaterialId: {
        type: String,
        required: false    // equivalent to allowNull: true
    },
    rawMaterialName: {
        type: String,
        required: false
    },
    currentStock: {
        type: Number,      // equivalent to INTEGER
        required: false
    },
    minimumRequired: {
        type: Number,
        required: false
    },
    finishedGoodId: {
        type: String,
        required: false
    },
    finishedGoodName: {
        type: String,
        required: false
    },
    finishedGoodCurrentStock: {
        type: Number,
        required: false
    },
    finishedGoodMinimumRequired: {
        type: Number,
        required: false
    }
}, {
    collection: 'machines',  // equivalent to tableName
    timestamps: false        // keeps timestamps disabled
});

// Create and export the model
const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;