const serverless = require('vercel-serverless');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables (for local testing, Vercel uses its own env setup)
dotenv.config({ path: '../config.env' });

// Import your Express app
const app = require('../app'); // Adjust path to point to app.js

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

// Export as serverless function
module.exports = serverless(app);