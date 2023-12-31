const reportModel = require("../models/report.model");
const transporter = require("../configs/mailer");
const cheerio = require("cheerio");

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

  static async editStatusReport(reportId, newStatus) {
    try {
      const updatedStatusReport = await reportModel.findByIdAndUpdate(
        { _id: reportId },
        { $set: { status_report: newStatus } },
        { new: true }
      );
      if (!updatedStatusReport) {
        throw new Error("Report not found");
      }
      return updatedStatusReport;
    } catch (error) {
      console.error("Error in editStatusReport service:", error);
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

  static async getAllReportsByStatus(username, statusReport) {
    try {
      const selectedStatuses = statusReport
        .split(",")
        .map((status) => status.trim());
      const reportsByStatus = await reportModel.find({
        user: username,
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

  static async searchReports(username, device, statusReport) {
    try {
      const regex = new RegExp(device, "i");
      const selectedStatuses = statusReport
        .split(",")
        .map((status) => status.trim());

      const foundReports = await reportModel.find({
        user: username,
        device: regex,
        status_report: { $in: selectedStatuses },
      });
      return foundReports;
    } catch (error) {
      console.error("Report not found:", error);
      throw new Error("Failed to get report in service");
    }
  }

  static async filterReportsByDate(username, date, statusReport) {
    try {
      const selectedStatuses = statusReport
        .split(",")
        .map((status) => status.trim());

      const foundReports = await reportModel.find({
        user: username,
        date_report: date,
        status_report: { $in: selectedStatuses },
      });
      return foundReports;
    } catch (error) {
      console.error("Report not found:", error);
      throw new Error("Failed to get report in service");
    }
  }

  static async sendEmail(email, contentEmail) {
    try {
      const contentHTML = contentEmail;
      const $ = cheerio.load(contentHTML);
      const imagenBase64 = $("img").attr("src");

      const mailOptions = {
        from: "Globant <globantbo@gmail.com>",
        to: email,
        subject: "Reporte de falla",
        text: "Reporte",
        html: contentHTML,
        attachments: [
          {
            filename: `imagen.jpg`,
            content: Buffer.from(imagenBase64.split(",")[1], "base64"), // Convierte Base64 a Buffer
          },
        ],
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
