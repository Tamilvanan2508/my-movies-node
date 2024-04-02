import User from "@models/user";

export const userService = {
  getUserById: async (userId: string) => {
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  updateUserById: async (userId: string, userData: any) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  },

  deleteUserById: async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  },
};
