import mongoose, { Schema, Document } from "mongoose";

export interface CommentModel extends Document {
  userId: string;
  movieId: string;
  commentText: string;
}

const CommentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    commentText: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<CommentModel>("Comment", CommentSchema);

export default Comment;
