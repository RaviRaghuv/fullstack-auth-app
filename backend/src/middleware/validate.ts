import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

// Validation middleware
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body against schema
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      // Pass validation errors to error handler
      next(error);
    }
  };
}; 