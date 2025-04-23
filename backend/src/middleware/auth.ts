import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

// Extend the Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

// Authentication middleware
export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401);
    }
    
    // Extract token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new AppError('Authentication required', 401);
    }
    
    // Verify token
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      throw new AppError('Server configuration error', 500);
    }
    
    try {
      // Decode token
      const decoded = jwt.verify(token, jwtSecret) as {
        id: string;
        email: string;
      };
      
      // Add user info to request
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
      
      next();
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  } catch (error) {
    next(error);
  }
}; 