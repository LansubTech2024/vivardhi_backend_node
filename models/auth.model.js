const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection');
const bcrypt = require('bcrypt');

const LoginUser = sequelize.define('LoginUser', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = LoginUser;