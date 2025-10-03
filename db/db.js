require("dotenv").config();
const mongoose = require("mongoose");
const connecttoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  
    console.log("Connected to MongoDB successfully");    
  } catch (error) {     
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
module.exports = connecttoDB;