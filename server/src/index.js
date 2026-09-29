import dotenv from 'dotenv';
import { randomBytes } from 'node:crypto';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET && process.env.NODE_ENV !== 'production') {
  process.env.JWT_SECRET = randomBytes(32).toString('hex');
  console.warn('JWT_SECRET is unset; using a temporary development secret for this server process.');
}

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
