import express from "express";
import { getAllMovies } from "@controllers/movieController";

const router = express.Router();

router.get("/", getAllMovies);

export default router;
