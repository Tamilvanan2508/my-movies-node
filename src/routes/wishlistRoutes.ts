import express from "express";
import {
  getAllWishlists,
  addToWishlist,
  removeFromWishlist,
} from "@controllers/wishlistController";

const router = express.Router();

router.get("/", getAllWishlists);
router.post("/add", addToWishlist);
router.delete("/remove/:movieId/:userId", removeFromWishlist);

export default router;
