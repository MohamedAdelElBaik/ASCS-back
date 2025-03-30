const express = require('express');
const cors = require('cors');
const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const eventsRoutes = require('./routes/eventsRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const attendancesRoutes = require('./routes/attendancesRoutes');
const framesRoutes = require('./routes/framesRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const streamRoutes = require('./routes/streamRoutes');

app.use(cors());
app.use(express.json());

// Middleware to display the time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Optional: Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'API is running on Vercel' });
});

// Routes
app.use('/api/events', eventsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/attendance', attendancesRoutes);
app.use('/api/frames', framesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/eventImages', imageRoutes);
app.use('/api/stream', streamRoutes);

// Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;