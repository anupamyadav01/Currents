const mongoose = require("mongoose");
require("dotenv").config();
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("MONGO connection error:", error);
  }
}

module.exports = connectDB;
