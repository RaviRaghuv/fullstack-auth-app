import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 