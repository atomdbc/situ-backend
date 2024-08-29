import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import listings from './routes/listings.js';
import auth from './routes/auth.js';
import users from './routes/users.js';
import reviews from './routes/reviews.js';
import notifications from './routes/notifications.js';
import messages from './routes/messages.js'; // Import the messages route

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/listings', listings);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/reviews', reviews);
app.use('/api/notifications', notifications);
app.use('/api/messages', messages); // Add the messages route here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
