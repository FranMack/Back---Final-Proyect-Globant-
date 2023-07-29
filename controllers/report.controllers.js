const ReportService = require("../services/report.services");

class ReportController {
  static async createReport(req, res) {
    try {
      const reportData = req.body;

      if (Object.keys(reportData).length === 0) {
        return res.status(400).json({ error: "Report data is empty." });
      }
      const createdReport = await ReportService.createReport(reportData);
      res.status(201).json(createdReport);
    } catch (error) {
      res.status(500).json({ error: "Failed to create report." });
    }
  }

  static async editReport(req, res) {
    try {
      let reportId = req.params.reportId.trim();
      const reportData = req.body;
      const updatedReport = await ReportService.editReport(
        reportId,
        reportData
      );
      res.status(200).json(updatedReport);
    } catch (error) {
      console.error("Error in editReport:", error);
      res.status(500).json({ error: "Failed to edit report controllers" });
    }
  }
  static async deleteReport(req, res) {
    try {
      let { id } = req.params;
      const result = await ReportService.deleteReport(id);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Failed to delete report in controller.");
    }
  }

  static async getAllReports(req, res) {
    try {
      const allReports = await ReportService.getAllReports();
      res.status(200).json(allReports);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch all reports." });
    }
  }

  static async getAllReportsByStatus(req, res) {
    try {
      const { username, statusReport } = req.params;
      console.log("pppp", username, statusReport);
      const reportsByStatus = await ReportService.getAllReportsByStatus(
        username,
        statusReport
      );
      res.status(200).json(reportsByStatus);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reports by status." });
    }
  }

  static async getReportById(req, res) {
    try {
      let { id } = req.params;
      const report = await ReportService.getReportById(id);
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ error: "Failed to get report in controller." });
    }
  }

  static async searchReports(req, res) {
    const { username, device, status } = req.query;
    try {
      const foundReports = await ReportService.searchReports(
        username,
        device,
        status
      );
      res.json(foundReports);
    } catch (error) {
      console.error("Failed to get report in controller.", error);
      res.status(500).json({ error: "Failed to get report in controller." });
    }
  }

  static async filterReportsByDate(req, res) {
    const { username, date, status } = req.query;

    try {
      const foundReports = await ReportService.filterReportsByDate(
        username,
        date,
        status
      );
      res.json(foundReports);
    } catch (error) {
      console.error("Failed to get report in controller.", error);
      res.status(500).json({ error: "Failed to get report in controller." });
    }
  }

  static async sendEmail(req, res) {
    const { email } = req.body;
    const { contentEmail } = req.body;

    try {
      const response = await ReportService.sendEmail(email, contentEmail);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
}

module.exports = ReportController;
