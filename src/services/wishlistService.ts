import Wishlist from "@models/wishlist";

export const wishlistService = {
  addToWishlist: async (userId: string, movieId: string) => {
    const wishlistItem = new Wishlist({ userId, movieId });
    await wishlistItem.save();
    return wishlistItem;
  },

  removeFromWishlist: async (userId: string, movieId: string) => {
    const deletedItem = await Wishlist.findOneAndDelete({ userId, movieId });
    return deletedItem;
  },
};
