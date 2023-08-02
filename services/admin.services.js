const reportModel = require("../models/report.model");
const userModel = require("../models/user.model");

class AdminService {
  static async getUserReports(user) {
    try {
      const allReports = await reportModel.find({
        user: user,
      });

      return allReports;
    } catch (error) {
      throw new Error("Failet to fetch all reports from the service");
    }
  }
}
module.exports = AdminService;
