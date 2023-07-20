const express = require("express");
const OfficeController = require("../controllers/office.controllers");

const routerOffice = express.Router();

routerOffice.get("/allOffices", OfficeController.getAllOffices);
routerOffice.post("/newOffice", OfficeController.createOffice);

module.exports = routerOffice;
