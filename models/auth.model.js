const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const authLoginSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  },
  

  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpire: {
    type: Date,
    required: false

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
    type: String,
    required: false
  }
}, {
  // This will automatically add and manage createdAt and updatedAt fields
  timestamps: true
});


// Create the model
const AuthLogin = mongoose.model('AuthLogin', authLoginSchema);


module.exports = AuthLogin;