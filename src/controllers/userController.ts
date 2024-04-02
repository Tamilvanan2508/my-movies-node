import { Request, Response } from "express";
import User from "@models/user";
import { userService } from "@services/userService";
import { sendResponse } from "@utils/utils";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalUsers = await User.countDocuments({});
    const users = await User.find({}, { password: 0 }).skip(skip).limit(limit);
    const message = "Fetched users successfully";
    const totalPages = Math.ceil(totalUsers / limit);

    let meta = {};
    if (users.length) {
      meta = {
        currentPage: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        totalCount: totalUsers,
      };
    }

    sendResponse(res, true, { data: users, meta }, message);
  } catch (error) {
    const message = "Internal Server Error";
    sendResponse(res, false, null, message, 500);
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    const message = "Fetched user details successfully";
    sendResponse(res, true, user, message);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 500);
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updateUserById(userId, req.body);
    const message = "User updated successfully";
    sendResponse(res, true, updatedUser, message);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 500);
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUserById(userId);
    const message = "User deleted successfully";
    sendResponse(res, true, null, message);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 500);
  }
};
