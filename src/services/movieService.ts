import Movie from "@models/movie";

export const movieService = {
  getMovieById: async (movieId: string) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }

    return movie;
  },
};
