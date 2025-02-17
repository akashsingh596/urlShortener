const mongoose = require("mongoose");

async function connectMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to Server");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

module.exports = connectMongoDB;
