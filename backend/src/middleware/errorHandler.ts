import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// Custom error class
export class AppError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// Error handler middleware
// @ts-ignore - Unused parameters are required for Express error handlers
export const errorHandler = (
  err: Error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.error('Error:', err);

  // Default error values
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: Record<string, string[]> | undefined = undefined;

  // Handle different types of errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = {};
    
    // Format Zod errors
    err.errors.forEach((e) => {
      const field = e.path.join('.');
      if (!errors![field]) {
        errors![field] = [];
      }
      errors![field].push(e.message);
    });
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  }

  // Send error response
  res.status(statusCode).json({
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}; 