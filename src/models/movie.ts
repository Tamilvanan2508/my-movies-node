import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Movie document
export interface IMovie extends Document {
  title: string;
  description: string;
  genre: string;
  release_date: Date;
}

// Define the schema for the Movie model
const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  release_date: { type: Date, required: true },
});

// Define and export the Movie model
const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
