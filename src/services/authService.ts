import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user";
import { generateSecretKey } from "../utils/utils";

const SECRET_KEY = generateSecretKey();

export const authService = {
  register: async (requestData: any) => {
    const { email, password } = requestData;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ ...requestData, password: hashedPassword });
  },

  login: async (email: string, password: string) => {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return token;
  },
};
