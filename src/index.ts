import "module-alias/register";
import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { config } from "@config/config";
import { connectDB } from "@utils/database";
import authRoutes from "@routes/authRoutes";
import userRoutes from "@routes/userRoutes";
import movieRoutes from "@routes/movieRoutes";
import wishlistRoutes from "@routes/wishlistRoutes";
import commentRoutes from "@routes/commentRoutes";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", movieRoutes);
app.use("/api", wishlistRoutes);
app.use("/api", commentRoutes);

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
