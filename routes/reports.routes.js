const express = require("express");
const ReportController = require("../controllers/report.controllers");

const routerReport = express.Router();

routerReport.post("/newReport", ReportController.createReport);
routerReport.put("/editReport/:reportId", ReportController.editReport);
routerReport.delete("/delete/:id", ReportController.deleteReport);
routerReport.get("/all", ReportController.getAllReports);
routerReport.get("/:id", ReportController.getReportById);
routerReport.get(
  "/status/:statusReport",
  ReportController.getAllReportsByStatus
);

routerReport.get("/search", ReportController.searchReports);
routerReport.get("/search-by-date", ReportController.filterReportsByDate);



module.exports = routerReport;
