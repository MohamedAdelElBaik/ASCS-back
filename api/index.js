const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });
const app = require('../app');

// MongoDB connection (run once at startup)
let isConnected = false;

const connectDB = async () => {
  if (!isConnected) {
    const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  }
};

// Connect at startup
connectDB().catch(err => console.error('MongoDB connection error:', err));

// Export the app
module.exports = app;