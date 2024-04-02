import { Request, Response } from "express";
import Wishlist from "@models/wishlist";
import { userService } from "@services/userService";
import { movieService } from "@services/movieService";
import { wishlistService } from "@services/wishlistService";
import { sendResponse } from "@utils/utils";

// Get all wishlists
export const getAllWishlists = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    const userId = req.query.userId;
    if (userId) {
      query = { userId };
    }

    const totalWishlists = await Wishlist.countDocuments(query);
    const wishlists = await Wishlist.find(query).skip(skip).limit(limit);

    const totalPages = Math.ceil(totalWishlists / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    let meta = {
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      totalCount: totalWishlists,
    };

    const message = "Wishlists fetched successfully";
    sendResponse(res, true, { data: wishlists, meta }, message);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 500);
  }
};

// Add movie to wishlist
export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, movieId } = req.body;

    await userService.getUserById(userId);
    await movieService.getMovieById(movieId);

    const wishlistItem = await wishlistService.addToWishlist(userId, movieId);

    const message = "Movie added to wishlist";
    sendResponse(res, true, wishlistItem, message);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 500);
  }
};

// Remove movie from wishlist
export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, movieId } = req.params;

    await userService.getUserById(userId);
    await movieService.getMovieById(movieId);

    const deletedItem = await wishlistService.removeFromWishlist(
      userId,
      movieId
    );

    const message = "Movie removed from wishlist";
    sendResponse(res, true, deletedItem, message);
  } catch (error) {
    const err = error as Error;
    sendResponse(res, false, null, err.message, 500);
  }
};
