const UserAdminServices = require("../services/userAdmin.services");

class UserAdmincontroller {
  static async listUsers(req, res) {
    try {
      const userList = await UserAdminServices.listUsers();
      res.status(200).json(userList);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch all users." });
    }
  }

  static async searchUsers(req, res) {
    const searchValue = req.query.searchValue;
    try {
      const users = await UserAdminServices.searchUsers(searchValue);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch all users." });
    }
  }

  static async filterUsersByLocation(req, res) {
    const searchValue = req.query.searchValue;
    try {
      const users = await UserAdminServices.filterUsersByLocation(searchValue);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch all users." });
    }
  }
  static async getUserReports(req, res) {
    try {
      const { user } = req.params;
      const allReports = await UserAdminServices.getUserReports(user);
      res.status(200).json(allReports);
    } catch (error) {
      res.status(400).json({ error: "Failed to fetch all reports " });
    }
  }
  static async selectDesk(req, res) {
    try {
      const { officeId, deskNumber } = req.body;

      const message = await UserAdminServices.selectDesk(officeId, deskNumber);

      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserAdmincontroller;
