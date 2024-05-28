import { Request, Response } from "express";
import User from "@models/user";
import { authService } from "@services/authService";
import { sendResponse } from "@utils/utils";
import { responseMessages } from "@data/index";

const { successfulRegistration, successfulLogin } = responseMessages;

export const register = async (req: Request, res: Response) => {
  try {
    const requestData = { ...req.body, description: "", profile: null };
    await authService.register(requestData);
    delete requestData.password;
    sendResponse(res, true, requestData, successfulRegistration, 201);
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
    sendResponse(res, true, { token, user }, successfulLogin);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 400);
  }
};
