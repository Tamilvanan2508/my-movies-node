import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Wishlist document
export interface IWishlist extends Document {
  userId: string;
  movieId: string;
}

// Define the schema for the Wishlist model
const wishlistSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Define and export the Wishlist model
const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;
