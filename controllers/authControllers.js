const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtsecret = process.env.JWTSECRET;

//to register user
const RegisterUser = async (req, res) => {
  try {
    //getting the userdata from frontend
    const { phone, email, password, device } = req.body;
    //getting the existing user as phone number
    const existingPhoneUser = await User.findOne({ phone });

    if (existingPhoneUser) {
      return res.status(409).json({
        message: "Mobile Number is Already is in use",
      });
    }
    // getting existing user as email
    const existingEmailUser = await User.findOne({ email });

    if (existingEmailUser) {
      return res.status(409).json({
        message: "Email is Already in use",
      });
    }
    // hashing password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({
          message: "something went wrong",
        });
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "something went wrong",
          });
        }

        //generation of token
        const token = jwt.sign({ phone, device }, jwtsecret, {
          expiresIn: "7d",
        });
        // creating new user
        const newUser = new User({
          phone,
          email,
          password: hash,
          devices: [token],
        });
        //saving the data
        const savedUser = await newUser.save();

        savedUser.password = undefined;
        savedUser.devices = undefined;
        //sending the request to the frontend
        res.status(201).json({
          message: "user Registered Successfully",
          user: savedUser,
          token,
        });
      });
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "something went wrong please try again later",
    });
  }
};

// to login user using email and password
const LoginUserFromEmail = async (req, res) => {
  try {
    //getting the required data from user
    const { email, password, device } = req.body;

    //getting user from database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // getting user password
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res.status(403).json({ message: "something went wrong" });
      }
      if (!result) {
        return res.status(403).json({
          message: "wrong Password",
        });
      }
      //user is authenticated
      if (user.devices.length > 1) {
        user.devices = [];
      }
      //generation of token
      const token = jwt.sign({ email, device }, jwtsecret, { expiresIn: "7d" });

      // setting the token into db and user
      user.devices.push(token);
      await user.save();
      user.password = undefined;
      user.devices = undefined;
      res.json({
        message: "user LoggedIn successfully",
        user,
        token,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "something went wrong please try again later",
    });
  }
};

//to login user from phone and password
const LoginUserFromPhone = async (req, res) => {
  try {
    //getting the required data from user
    const { phone, password, device } = req.body;

    //getting user from database
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // getting user password
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res.status(403).json({ message: "something went wrong" });
      }
      if (!result) {
        return res.status(403).json({
          message: "wrong Password",
        });
      }
      //user is authenticated
      if (user.devices.length > 1) {
        user.devices = [];
      }
      //generation of token
      const token = jwt.sign({ phone, device }, jwtsecret, { expiresIn: "7d" });

      // setting the token into db and user
      user.devices.push(token);
      await user.save();
      user.password = undefined;
      user.devices = undefined;
      res.json({
        message: "user LoggedIn successfully",
        user,
        token,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "something went wrong please try again later",
    });
  }
};

const GetUser = async (req, res) => {
  try {
    req.user.data.password = undefined;
    req.user.data.devices = undefined;
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "something went wrong please try again later",
    });
  }
};

module.exports = {
  RegisterUser,
  LoginUserFromEmail,
  LoginUserFromPhone,
  GetUser,
};
