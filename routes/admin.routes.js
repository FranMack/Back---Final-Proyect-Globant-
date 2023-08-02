const express = require("express");
const AdminController = require("../controllers/admin.controllers");
const routerAdmin = express.Router();

routerAdmin.get("/reports/:user", AdminController.getUserReports);

module.exports = routerAdmin;
