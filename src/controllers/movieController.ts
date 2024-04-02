import { Request, Response } from "express";
import Movie from "@models/movie";
import { sendResponse } from "@utils/utils";

// Get all movies
export const getAllMovies = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalMovies = await Movie.countDocuments({});
    const movies = await Movie.find({}).skip(skip).limit(limit);
    const message = "Fetched movies successfully";
    const totalPages = Math.ceil(totalMovies / limit);

    let meta = {};
    if (movies.length) {
      meta = {
        currentPage: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        totalCount: totalMovies,
      };
    }

    sendResponse(res, true, { data: movies, meta }, message);
  } catch (error) {
    const message = "Internal Server Error";
    sendResponse(res, false, null, message, 500);
  }
};
