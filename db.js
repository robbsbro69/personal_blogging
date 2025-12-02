const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection Established");
  } catch (error) {
    console.log("Connection Failed", error);
  }
};

module.exports = connectDB;
