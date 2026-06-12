const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connString = process.env.MONGODB_URI || 'mongodb://localhost:27017/astrogems';
    await mongoose.connect(connString);
    console.log(`MongoDB Connected successfully to ${mongoose.connection.name}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
