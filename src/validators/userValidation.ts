import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

// Define Joi schema for user registration validation
const registerValidationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
  description: Joi.string().max(255),
  profile: Joi.string(),
});

// Define Joi schema for user login validation
const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
});

// Middleware function to validate user registration data
export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Middleware function to validate user login data
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
