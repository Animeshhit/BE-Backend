const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: {
    type: Number,
    require: [true, "PhoneNumber Is Required"],
    unique: true,
    min: [10, "Phone Number should be in 10 digits"],
  },
  email: {
    type: String,
    require: [true, "Email is Required"],
  },
  profileUrl: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    require: [true, "Password is Required"],
  },
  role: {
    type: String,
    default: "USER",
  },
  userName: {
    type: String,
    default: null,
  },
  year: {
    type: Number,
    default: null,
  },
  collegeName: {
    type: String,
    default: null,
  },
  notification: {
    type: Array,
    default: [],
  },
  isPrime: {
    type: Boolean,
    default: false,
  },
  devices: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
