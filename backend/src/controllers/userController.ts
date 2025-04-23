import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';
import { AppError } from '../middleware/errorHandler';

// Initialize Prisma client
const prisma = new PrismaClient();

// Generate JWT token
const generateToken = (id: string, email: string): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new AppError('JWT secret is not defined', 500);
  }
  
  return jwt.sign({ id, email }, secret, { expiresIn: '24h' });
};

// Register user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    
    // Generate token
    const token = generateToken(user.id, user.email);
    
    // Return user and token
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }
    
    // Generate token
    const token = generateToken(user.id, user.email);
    
    // Return user and token
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }
    
    // Find user by id
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Return user (without password)
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}; 