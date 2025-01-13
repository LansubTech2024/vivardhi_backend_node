// const { DataTypes } = require('sequelize');
// const sequelize = require('../DB_connection/db_connection'); // Adjust the path to your database configuration

// const ChatMessage = sequelize.define('ChatMessage', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   sender: {
//     type: DataTypes.STRING,
//     allowNull: false, // Either "user" or "bot"
//   },
//   message: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   timestamp: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   tableName: 'chat_messages', // Database table name
//   timestamps: true, // Automatically add createdAt and updatedAt fields
// });

// module.exports = ChatMessage;

const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'chat_messages',
    timestamps: true
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;