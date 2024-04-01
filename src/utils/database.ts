import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../config/config";

interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
}

export const connectDB = async () => {
  try {
    const options: MyConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(config.dbUrl, options);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};