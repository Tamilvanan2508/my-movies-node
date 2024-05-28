import { Request, Response } from "express";
import User from "@models/user";
import { userService } from "@services/userService";
import { sendResponse } from "@utils/utils";
import { responseMessages } from "@data/index";

const {
  usersFetched,
  userFetched,
  userUpdated,
  userDeleted,
  internalServerError,
} = responseMessages;

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalUsers = await User.countDocuments({});
    const users = await User.find({}, { password: 0 }).skip(skip).limit(limit);
    const totalPages = Math.ceil(totalUsers / limit);

    const meta = users.length
      ? {
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          totalCount: totalUsers,
        }
      : {};

    sendResponse(res, true, { data: users, meta }, usersFetched);
  } catch (error) {
    sendResponse(res, false, null, internalServerError, 500);
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    sendResponse(res, true, user, userFetched);
  } catch (error) {
    sendResponse(res, false, null, (error as Error).message, 500);
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updateUserById(userId, req.body);
    sendResponse(res, true, updatedUser, userUpdated);
  } catch (error) {
    sendResponse(res, false, null, (error as Error).message, 500);
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUserById(userId);
    sendResponse(res, true, null, userDeleted);
  } catch (error) {
    sendResponse(res, false, null, (error as Error).message, 500);
  }
};
