import express from 'express';
import { login, register, getCurrentUser } from '../controllers/userController';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';
import { z } from 'zod';

const router = express.Router();

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', auth, getCurrentUser);

export default router; 