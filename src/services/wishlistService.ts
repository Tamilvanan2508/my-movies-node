import Wishlist from "@models/wishlist";

export const wishlistService = {
  addToWishlist: async (userId: string, movieId: string) => {
    const existingItem = await Wishlist.findOne({ userId, movieId });
    if (existingItem) {
      throw new Error("Movie is already in the wishlist");
    }

    const wishlistItem = new Wishlist({ userId, movieId });
    await wishlistItem.save();
    return wishlistItem;
  },

  removeFromWishlist: async (userId: string, movieId: string) => {
    const deletedItem = await Wishlist.findOneAndDelete({ userId, movieId });
    return deletedItem;
  },
};
