const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// Load environment variables
require("dotenv").config();

const app = express();

// Middlewares added BEFORE any routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recommend', require('./routes/recommend'));
app.use('/api/history', require('./routes/history'));

// Root endpoint / Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Gemstone Recommendation API is running.' });
});

// Serve error message for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'API Route Not Found' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start listening only after connection is established
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
