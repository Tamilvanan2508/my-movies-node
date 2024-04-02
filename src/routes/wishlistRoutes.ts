import express from "express";
import {
  getAllWishlists,
  addToWishlist,
  removeFromWishlist,
} from "@controllers/wishlistController";

const router = express.Router();

router.get("/wishlist", getAllWishlists);
router.post("/wishlist/add", addToWishlist);
router.delete("/wishlist/remove/:movieId/:userId", removeFromWishlist);

export default router;
