import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './infrastructure/database/mongo.js';
import routes from './interfaces/routes/index.js';
import { rateLimiter } from './config/rateLimit.config.js';
import { corsOptions } from './config/cors.config.js';


dotenv.config();

const app = express();

//Middleware
app.use(rateLimiter);              
app.use(corsOptions);              
              
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', routes);

// Server + Database Connection
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();