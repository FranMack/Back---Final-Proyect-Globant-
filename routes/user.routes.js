const express = require("express");
const routerUser = express.Router();
const UserController = require("../controllers/user.controllers")

routerUser.post("/register", UserController.createUser);


module.exports = routerUser;