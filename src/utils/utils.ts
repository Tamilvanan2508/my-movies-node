import { Response } from "express";
import crypto from "crypto";

export const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const sendResponse = (
  res: Response,
  success: boolean,
  response: any,
  message: string,
  statusCode: number = 200
) => {
  res.status(statusCode).json({ success, response, message });
};
