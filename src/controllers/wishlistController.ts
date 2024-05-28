import { Request, Response } from "express";
import Wishlist from "@models/wishlist";
import { userService } from "@services/userService";
import { movieService } from "@services/movieService";
import { wishlistService } from "@services/wishlistService";
import { sendResponse } from "@utils/utils";
import { responseMessages } from "@data/index";

const {
  wishlistsFetched,
  movieAddedToWishlist,
  movieRemovedFromWishlist,
  internalServerError,
} = responseMessages;

// Get all wishlists
export const getAllWishlists = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    let query = {};
    const userId = req.query.userId;
    if (userId) query = { userId };
    const totalWishlists = await Wishlist.countDocuments(query);
    const wishlists = await Wishlist.find(query).skip(skip).limit(limit);
    const totalPages = Math.ceil(totalWishlists / limit);

    const meta = {
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      totalCount: totalWishlists,
    };

    sendResponse(res, true, { data: wishlists, meta }, wishlistsFetched);
  } catch (error) {
    sendResponse(res, false, null, internalServerError, 500);
  }
};

// Add movie to wishlist
export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, movieId } = req.body;

    await userService.getUserById(userId);
    await movieService.getMovieById(movieId);

    const wishlistItem = await wishlistService.addToWishlist(userId, movieId);

    sendResponse(res, true, wishlistItem, movieAddedToWishlist);
  } catch (error) {
    sendResponse(res, false, null, (error as Error).message, 500);
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

    sendResponse(res, true, deletedItem, movieRemovedFromWishlist);
  } catch (error) {
    sendResponse(res, false, null, (error as Error).message, 500);
  }
};
