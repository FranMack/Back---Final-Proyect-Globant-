const express = require("express");

const UserAdmincontroller = require("../controllers/userAdmin.controllers");
const routerAdmin = express.Router();

routerAdmin.get("/users-list", UserAdmincontroller.listUsers);
routerAdmin.get("/search", UserAdmincontroller.searchUsers);
routerAdmin.get("/search-location", UserAdmincontroller.filterUsersByLocation);
routerAdmin.get("/reports/:user", UserAdmincontroller.getUserReports);
routerAdmin.put("/select-desk", UserAdmincontroller.selectDesk);

module.exports = routerAdmin;
