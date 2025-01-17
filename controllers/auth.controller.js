const userModel = require("../models/auth.model");
const auth = require("../public/auth");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { generateQRCode } = require("../utils/qrGenerator");
const dotenv = require("dotenv");
dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// SignUp Controller
const SignUp = async (req, res) => {
  try {

    const { companyname, username, email, password } = req.body;
    
    if (!companyname || !username || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    
    // Changed from Sequelize to MongoDB syntax
    const ExistUser = await userModel.findOne({ email });
    
    if (ExistUser) {
      return res.status(400).json({
        message: "Email is already registered",
      });
    }
    
    const hashedPassword = await auth.hashPassword(password);
    const newUser = new userModel({
      companyname,
      username,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// SignIn Controller
const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Changed from Sequelize to MongoDB syntax
    const User = await userModel.findOne({ email });
    
    if (!User) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const validPassword = await auth.hashCompare(password, User.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }


    // Generate QR code
    const qrCode = await generateQRCode(User);
    
    // Update user with new QR code - MongoDB syntax
    await userModel.findByIdAndUpdate(User._id, { qr_code: qrCode });


    const token = await auth.createToken({
      id: User._id,
      name: User.name,
      email: User.email,
    });

    // Get user data without password - MongoDB syntax
    const userData = await userModel.findOne({ email }).select('-password');

    // Add token to userData
    const userDataWithToken = {
      ...userData.toObject(),
      token,
    };

    res.status(201).json({
      message: "Login successful",
      token,
      userData: userDataWithToken,

      qrCode,

    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const refreshQRCode = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Changed to MongoDB syntax
    const User = await userModel.findById(userId);
    
    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    const qrCode = await generateQRCode(User);
    await userModel.findByIdAndUpdate(userId, { qr_code: qrCode });


    res.status(200).json({
      success: true,
      qrCode: qrImage,
      whatsappGroupLink
    });

    // res.status(201).json({ message: "Login successful", token, userData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    // Changed to MongoDB syntax
    const user = await userModel.findOne({ email: req.body.email });
    
    if (user) {
      const randomString = randomstring.generate({
        length: 10,
        charset: "alphanumeric",
      });
      const expirationTimestamp = Date.now() + 2 * 60 * 1000;

      const resetLink = `https://samplefrontendserver-ajeta9hdc3h5hpdg.southeastasia-01.azurewebsites.net/resetpassword/${randomString}/${expirationTimestamp}`;

      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: user.email,
        subject: "Password Reset",
        html: `
        <h3>Password Change Request</h3>
        <p>Click on the below link to reset your password</p>
        <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; cursor:pointer;">Set Your New Password</a>
        `,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send({
            message: "Failed to send the password reset mail",
          });
        } else {
          try {
            // Update randomString - MongoDB syntax
            await userModel.findByIdAndUpdate(user._id, { randomString });
            res.status(201).send({
              message: "Password reset mail sent successfully. Random string updated in the database.",
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Failed to update random string in the database",
            });
          }
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { randomString, expirationTimestamp } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).send({
        message: "Passwords do not match",
      });
    }

    // Changed to MongoDB syntax
    const user = await userModel.findOne({ randomString });
    
    if (!user || user.randomString !== randomString) {
      return res.status(400).send({
        message: "Invalid Random String",
      });
    }

    if (expirationTimestamp && expirationTimestamp < Date.now()) {
      return res.status(400).send({
        message: "Expiration token has expired. Please request a new reset link.",
      });
    }

    if (req.body.newPassword) {
      const hashedPassword = await auth.hashPassword(req.body.newPassword);
      
      // Update password and clear randomString - MongoDB syntax
      await userModel.findByIdAndUpdate(user._id, {
        password: hashedPassword,
        randomString: null
      });

      return res.status(200).send({
        message: "Your new password has been updated successfully",
      });
    } else {
      return res.status(400).send({
        message: "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { companyname, username, email } = req.body;

    // Changed to MongoDB syntax
    const User = await userModel.findById(userId);
    
    if (!User) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await userModel.findByIdAndUpdate(userId, { companyname, username, email });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  refreshQRCode,
  UpdateProfile,
};