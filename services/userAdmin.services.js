const userModel = require("../models/user.model");

class UserAdminServices {
  static async listUsers() {
    try {
      const allUsers = await userModel.find();
      return allUsers;
    } catch (error) {
      throw new Error("Failed to fetch all users from the service.");
    }
  }

  static async searchUsers(searchValue) {
    try {
      const regex = new RegExp(searchValue, "i");
      const users = await userModel.find({
        $or: [
          { email: regex },
          { first_name: regex },
          { last_name: regex },
          { username: regex },
        ],
      });

      return users;
    } catch (error) {
      console.error("Report not found:", error);
      throw new Error("Failed to get report in service");
    }
  }

  static async filterUsersByLocation(searchValue) {
    try {
      const regex = new RegExp(searchValue, "i");
      const users = await userModel.find({
        location: regex,
      });

      return users;
    } catch (error) {
      console.error("Report not found:", error);
      throw new Error("Failed to get report in service");
    }
  }
}

module.exports = UserAdminServices;
