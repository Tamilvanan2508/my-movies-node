import { Request, Response } from "express";
import mongoose from "mongoose";
import { sendResponse } from "../utils/utils";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const User = mongoose.connection.db.collection("users");
    const users = await User.find({}).toArray();
    const message = "Fetched users successfully";
    sendResponse(res, true, users, message);
  } catch (error) {
    const message = "Internal Server Error";
    sendResponse(res, false, null, message, 500);
  }
};
