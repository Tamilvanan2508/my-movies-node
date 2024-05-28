import { Request, Response } from "express";
import Movie from "@models/movie";
import { sendResponse } from "@utils/utils";
import { responseMessages } from "@data/index";

const { moviesFetched, internalServerError } = responseMessages;

export const getAllMovies = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalMovies = await Movie.countDocuments({});
    const movies = await Movie.find({}).skip(skip).limit(limit);
    const totalPages = Math.ceil(totalMovies / limit);

    const meta = movies.length
      ? {
          currentPage: page,
          totalPages: totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          totalCount: totalMovies,
        }
      : {};

    sendResponse(res, true, { data: movies, meta }, moviesFetched);
  } catch (error) {
    sendResponse(res, false, null, internalServerError, 500);
  }
};
