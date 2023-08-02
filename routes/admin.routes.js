const express = require("express");
const UserAdmincontroller = require("../controllers/userAdmin.controllers");
const routerAdmin = express.Router();

routerAdmin.get("/users-list", UserAdmincontroller.listUsers)
routerAdmin.get("/search",UserAdmincontroller.searchUsers)
routerAdmin.get("/search-location",UserAdmincontroller.filterUsersByLocation)

module.exports = routerAdmin;




