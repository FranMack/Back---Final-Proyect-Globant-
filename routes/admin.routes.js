const express = require("express");
const UserAdmincontroller = require("../controllers/userAdmin.controllers");
const routerAdmin = express.Router();

routerAdmin.get("/users-list", UserAdmincontroller.listUsers())


module.exports = routerAdmin;
