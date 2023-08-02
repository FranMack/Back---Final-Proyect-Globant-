const express = require("express");

const AdminController = require("../controllers/admin.controllers");
const UserAdmincontroller = require("../controllers/userAdmin.controllers");
const routerAdmin = express.Router();

routerAdmin.get("/users-list", UserAdmincontroller.listUsers)
routerAdmin.get("/search",UserAdmincontroller.searchUsers)
routerAdmin.get("/search-location",UserAdmincontroller.filterUsersByLocation)
routerAdmin.get("/reports/:user", AdminController.getUserReports);

module.exports = routerAdmin;





