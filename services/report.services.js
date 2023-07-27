const reportModel = require("../models/report.model");
const transporter=require("../configs/mailer")

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
      const selectedStatuses = statusReport
        .split(",")
        .map((status) => status.trim());
      const reportsByStatus = await reportModel.find({
        status_report: { $in: selectedStatuses },
      });
      return reportsByStatus;
    } catch (error) {
      throw new Error("Failed to fetch reports by status from the service.");
    }
  }

  static async getReportById(id) {
    try {
      const report = await reportModel.findById({ _id: id });
      if (!report) {
        throw new Error("Report not found");
      }
      return report;
    } catch (error) {
      throw new Error("Failed to get report in service.");
    }
  }

  static async searchReports(device, statusReport) {
    try {
      const regex = new RegExp(device, "i");
      const selectedStatuses = statusReport
        .split(",")
        .map((status) => status.trim());

      const foundReports = await reportModel.find({
        device: regex,
        status_report: { $in: selectedStatuses },
      });
      return foundReports;
    } catch (error) {
      console.error("Report not found:", error);
      throw new Error("Failed to get report in service");
    }
  }

  static async filterReportsByDate(date, statusReport) {
    try {
      const selectedStatuses = statusReport
        .split(",")
        .map((status) => status.trim());

      const foundReports = await reportModel.find({
        date_report: date,
        status_report: { $in: selectedStatuses },
      });
      return foundReports;
    } catch (error) {
      console.error("Report not found:", error);
      throw new Error("Failed to get report in service");
    }
  }


  static async sendEmail(email,contentEmail) {
    try {

      const contentHTML =contentEmail;
      
  

      const mailOptions = {
        from: "Globant <globantbo@gmail.com>",
        to: email,
        subject: "Reporte de falla",
        text: "Reporte",
        html:contentHTML
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Correo electrónico enviado: " + info.response);

      return "Correo electrónico enviado";
    } catch (error) {
      console.log(error);
      throw new Error("Error al enviar el correo electrónico");
    }
  }






}

module.exports = ReportService;
