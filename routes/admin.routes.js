const express = require("express");
const UserAdmincontroller = require("../controllers/userAdmin.controllers");
const ReportController = require("../controllers/report.controllers");
const routerAdmin = express.Router();

routerAdmin.get("/users-list", UserAdmincontroller.listUsers);
routerAdmin.get("/search", UserAdmincontroller.searchUsers);
routerAdmin.get("/search-location", UserAdmincontroller.filterUsersByLocation);
routerAdmin.delete("/report/delete/:id", ReportController.deleteReport);

module.exports = routerAdmin;
