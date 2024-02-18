const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGOURL = process.env.MONGOURL;

const connectToDataBase = (callback) => {
  mongoose
    .connect(MONGOURL)
    .then(() => {
      console.log(`dataBase connection Successfull`);
      callback(true);
    })
    .catch((err) => {
      console.log(`database connection error ${err.message}`);
      callback(false);
    });
};

module.exports = connectToDataBase;
