const reportModel = require("../models/report.model");

class ReportService {
  static async createReport(reportData) {
    try {
      const newReport = new reportModel(reportData);
      const createdReport = await newReport.save();
      return createdReport;
    } catch (error) {
      throw new Error("Failed to create report in service.");
    }
  }

  static async editReport(reportId, reportData) {
    try {
      const updatedReport = await reportModel.findByIdAndUpdate(
        { _id: reportId },
        { $set: reportData },
        { new: true }
      );
      console.log("Updated report in service:", updatedReport);
      if (!updatedReport) {
        throw new Error("Report not found");
      }
      return updatedReport;
    } catch (error) {
      console.error("Error in editReport service:", error);
      throw new Error("Failed to edit report in service.");
    }
  }

  static async deleteReport(id) {
    try {
      const deletedReport = await reportModel.deleteOne({ _id: id });
      console.log("Deleted report:", deletedReport);
      return "Report deleted";
    } catch (error) {
      throw new Error("Failed to delete report in service.");
    }
  }

  static async getAllReports() {
    try {
      const allReports = await reportModel.find();
      return allReports;
    } catch (error) {
      throw new Error("Failed to fetch all reports from the service.");
    }
  }

  static async getAllReportsByStatus(statusReport) {
    try {
      const reportsByStatus = await reportModel.find({
        status_report: statusReport,
      });
      return reportsByStatus;
    } catch (error) {
      throw new Error("Failed to fetch reports by status from the service.");
    }
  }
}

module.exports = ReportService;
