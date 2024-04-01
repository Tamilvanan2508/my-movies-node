import { Request, Response } from "express";
import User from "../models/user";
import { authService } from "../services/authService";
import { sendResponse } from "../utils/utils";

export const register = async (req: Request, res: Response) => {
  try {
    const requestData = { ...req.body, description: "", profile: null };
    await authService.register(requestData);
    const message = "User registered successfully";
    delete requestData.password;
    sendResponse(res, true, requestData, message, 201);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    const user = await User.findOne({ email }, { password: 0 });
    const message = "User logged in successfully";
    sendResponse(res, true, { token, user }, message);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 400);
  }
};
