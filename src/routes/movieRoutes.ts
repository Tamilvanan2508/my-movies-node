import express from "express";
import { getAllMovies } from "@controllers/movieController";

const router = express.Router();

router.get("/movies", getAllMovies);

export default router;
