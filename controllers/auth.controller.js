const userModel = require("../models/auth.model");
const dotenv = require("dotenv");
const auth = require("../public/auth");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

dotenv.config()

const SignUp = async (req, res) => {
  try {
    const {
      companyname,
      username,
      email,
      password,
    } = req.body;
    if (
      !companyname||
      !username||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const ExistUser = await userModel.findOne({ where: { email: email }, });
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

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await userModel.findOne({ where: { email: email } });
    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const validPassword = await auth.hashCompare(password, User.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    const token = await auth.createToken({
      id: User.id,
      name: User.name,
      email: User.email,
    });
    const userData = await userModel.findOne(
      { where: { email: req.body.email } },
      { attributes: { exclude: ['password'] } }
    );
    res.status(201).json({
      message: "Login successful",
      token,
      userData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const {
      companyname,
      username,
      email,
      designation,
    } = req.body;

    //find the student by email
    const matcheduser = await userModel.findOne({ email });

    //If student not found return error
    if (!matcheduser) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid email",
      });
    }
    //hash the password if provided
    let hashedPassword = matcheduser.password;
    if (password) {
      hashedPassword = await auth.hashPassword(password);
    }

    //update student object
      (matcheduser.companyname = companyname),
      (matcheduser.username = username),
      (matcheduser.email = email),
      (matcheduser.designation = designation),
      //update the student in the database
      await userModel.findByIdAndUpdate(matcheduser._id, matcheduser);

    //response with success message
    res.status(201).json({
      success: true,
      message: "Account updated successfully",
      matchedstudent,
    });
  } catch (err) {
    //Handle errors
    console.error(err);
    res.status(400).json({
      message: "Error on updating please try again later",
    });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const randomString = randomstring.generate({
        length: 10,
        charset: "alphanumeric",
      });
      const expirationTimestamp = Date.now() + 2 * 60 * 1000;

      console.log(expirationTimestamp);

      const resetLink = `https://samplefrontendserver-ajeta9hdc3h5hpdg.southeastasia-01.azurewebsites.net/resetpassword/${randomString}/${expirationTimestamp}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
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
          console.log("Password reset mail sent", +info.response);
          try {
            user.randomString = randomString;
            await user.save();
            res.status(201).send({
              message:
                "Password reset mail sent successfully.Random string updated in the database.",
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Failed update random string in the database",
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

    // Validate if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).send({
        message: "Passwords do not match",
      });
    }

    const user = await userModel.findOne({ randomString: randomString });
    if (!user || user.randomString !== randomString) {
      return res.status(400).send({
        message: "Invalid Random String",
      });
    }

    if (expirationTimestamp && expirationTimestamp < Date.now()) {
      return res.status(400).send({
        message:
          "Expiration token has expired. Please request a new reset link.",
      });
    } else {
      if (req.body.newPassword) {
        const newPassword = await auth.hashPassword(req.body.newPassword);

        user.password = newPassword;
        user.randomString = null;
        await user.save();

        return res.status(200).send({
          message: "Your new password has been updated successfully",
        });
      } else {
        return res.status(400).send({
          message:
            "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

module.exports = {
  SignUp,
  SignIn,
  updateStudentProfile,
  ForgotPassword,
  ResetPassword,
};
