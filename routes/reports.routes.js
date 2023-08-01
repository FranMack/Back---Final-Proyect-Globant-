const express = require("express");
const ReportController = require("../controllers/report.controllers");

const routerReport = express.Router();

routerReport.post("/newReport", ReportController.createReport);
routerReport.put("/editReport/:reportId", ReportController.editReport);
routerReport.put("/editStateReport/:reportId", ReportController.editStatusReport);
routerReport.delete("/delete/:id", ReportController.deleteReport);
routerReport.get("/search", ReportController.searchReports);
routerReport.get("/search-by-date", ReportController.filterReportsByDate);
routerReport.get("/all", ReportController.getAllReports);
routerReport.get("/single/:id", ReportController.getReportById);
routerReport.get(
  "/status/:username/:statusReport",
  ReportController.getAllReportsByStatus
);

routerReport.post("/send-email", ReportController.sendEmail);

module.exports = routerReport;
