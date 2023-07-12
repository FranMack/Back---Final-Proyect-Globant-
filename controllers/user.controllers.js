const UserService= require("../services/user.services")


class UserController {
    static async createUser(req, res) {
      try {
        const userData = req.body;
        const userService = new UserService();
        const user = await userService.createUser(userData);
        res.status(201).json({ user });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = UserController; 