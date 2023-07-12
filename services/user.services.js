const userModel = require("../models/user.model")


class UserService {
  async createUser(data) {
    try {
      const existingUser = await userModel.findOne({ email: data.email });

      if (existingUser) {
        throw new Error("Email already exists");
      }

      const newUser = new userModel(data);
      await newUser.setPassword(data.password);
      return await newUser.save();
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }
}

module.exports = UserService;

