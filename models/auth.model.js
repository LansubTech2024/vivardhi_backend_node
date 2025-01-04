const { DataTypes} = require('sequelize');
const sequelize = require('../DB_connection/db_connection');
const bcrypt = require('bcrypt');

const AuthLogin = sequelize.define('AuthLogin', {
  companyname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
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
  },
  qr_code: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  whatsapp_group_link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  whatsapp_group_id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // resetPasswordToken: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // resetPasswordExpire: {
  //   type: DataTypes.DATE,
  //   allowNull: true,
  // },
  randomString: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// In your admin panel, store group links for each company
const assignWhatsAppGroup = async (companyId, groupLink) => {
  await Login.update(
    { whatsapp_invite_link: groupLink },
    { where: { id: companyId } }
  );
};


module.exports = AuthLogin;