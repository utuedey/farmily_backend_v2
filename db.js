// db.js
// connect to mongodb database using mongoose.

require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;


const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
