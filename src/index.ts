import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { config } from "./config/config";
import { connectDB } from "./utils/database";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
