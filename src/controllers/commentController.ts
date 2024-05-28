import { Request, Response } from "express";
import Comment from "@models/comment";
import { userService } from "@services/userService";
import { movieService } from "@services/movieService";
import { commentService } from "@services/commentServices";
import { sendResponse } from "@utils/utils";
import { responseMessages } from "@data/index";

const { commentsFetched, commentAdded, commentRemoved, internalServerError } =
  responseMessages;

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (req.query.movieId) query.movieId = req.query.movieId;
    if (req.query.userId) query.userId = req.query.userId;

    const totalComments = await Comment.countDocuments(query);
    const comments = await Comment.find(query).skip(skip).limit(limit);

    const totalPages = Math.ceil(totalComments / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const meta = comments.length
      ? {
          currentPage: page,
          totalPages,
          hasNextPage,
          hasPreviousPage,
          totalCount: totalComments,
        }
      : {};

    sendResponse(res, true, { data: comments, meta }, commentsFetched);
  } catch (error) {
    sendResponse(res, false, null, internalServerError, 500);
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { userId, movieId, commentText } = req.body;

    await userService.getUserById(userId);
    await movieService.getMovieById(movieId);
    commentService.validateComment(commentText);

    const comment = await commentService.addComment(
      userId,
      movieId,
      commentText
    );

    sendResponse(res, true, comment, commentAdded);
  } catch (error) {
    sendResponse(res, false, null, (error as Error).message, 500);
  }
};

export const removeComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await commentService.removeComment(commentId);
    sendResponse(res, true, deletedComment, commentRemoved);
  } catch (error) {
    sendResponse(res, false, null, (error as Error).message, 500);
  }
};
