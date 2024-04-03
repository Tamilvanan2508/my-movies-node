import express from "express";
import {
  getAllComments,
  addComment,
  removeComment,
} from "@controllers/commentController";

const router = express.Router();

router.get("/comments", getAllComments);
router.post("/comments", addComment);
router.delete("/comments/:commentId", removeComment);

export default router;
