const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables (for local testing; Vercel uses its own env)
dotenv.config({ path: '../config.env' });

// Import your Express app
const app = require('../app'); // Adjust path if needed

// MongoDB connection
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) { // Only connect if not already connected
    const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  }
};

// Middleware to ensure DB connection for each request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Export the Express app directly for Vercel
module.exports = app;