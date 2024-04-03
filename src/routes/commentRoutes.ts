import express from "express";
import {
  getAllComments,
  addComment,
  removeComment,
} from "@controllers/commentController";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", addComment);
router.delete("/:commentId", removeComment);

export default router;
