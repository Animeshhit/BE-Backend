require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWTSECRET;
const User = require("../model/userModel");

const authenticateTokenAndFindUser = (req, res, next) => {
  try {
    let user = null;
    //getting the token from headers
    const token = req.header("Authorization").split(" ")[1];
    if (token == undefined || token == null) {
      return res.status(403).json({ message: "unAuth" });
    }
    //getting the data that are being stored into the database
    jwt.verify(token, jwtsecret, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "something went wrong" });
      }

      if (decoded.phone) {
        user = await User.findOne({ phone: decoded.phone });
      } else {
        user = await User.findOne({ email: decoded.email });
      }

      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      if (!user.devices.includes(token)) {
        return res.status(403).json({ message: "You are not LoggedIn" });
      }
      req.user = {
        data: user,
        device: decoded.device,
      };
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "something went wrong err2",
    });
  }
};

module.exports = authenticateTokenAndFindUser;
