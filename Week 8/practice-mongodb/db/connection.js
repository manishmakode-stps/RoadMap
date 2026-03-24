const mongoose = require('mongoose');

const connectDB = async (req,res) => {
     try {
    const conn = await mongoose.connect('mongodb://localhost:27017/practice-mongodb');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
