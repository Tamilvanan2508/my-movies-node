import Comment from "@models/comment";

export const commentService = {
  validateComment: (commentText: string) => {
    if (!commentText) {
      throw new Error("Invalid comment data");
    }
  },

  addComment: async (userId: string, movieId: string, commentText: string) => {
    const comment = new Comment({
      userId: userId,
      movieId: movieId,
      commentText: commentText,
    });

    await comment.save();
    return comment;
  },

  removeComment: async (commentId: string) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    return deletedComment;
  },
};
