const AdminService = require("../services/admin.services");
const userModel = require("../models/user.model");
class AdminController {
  static async getUserReports(req, res) {
    try {
      const { user } = req.params;
      const allReports = await AdminService.getUserReports(user);
      console.log(allReports);
      res.status(200).json(allReports);
    } catch (error) {
      res.status(400).json({ error: "Failed to fetch all reports " });
    }
  }
}
module.exports = AdminController;
