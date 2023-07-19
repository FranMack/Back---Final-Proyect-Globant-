const express = require("express");
const UserController = require("../controllers/user.controllers");
const ReportController = require("../controllers/report.controllers");
const OfficeController = require("../controllers/office.controllers");
const { auth } = require("../midlewares/auth.midlewares");

const routerUser = express.Router();

routerUser.post("/register", UserController.createUser);
routerUser.post("/login", UserController.loginUser);
routerUser.get("/profile/:username", UserController.getProfile);
routerUser.put("/profile/:username", UserController.updateProfile);
routerUser.get("/info", auth, UserController.getInfo);

routerUser.post("/newReport", ReportController.createReport);
routerUser.put("/editReport/:reportId", ReportController.editReport);
routerUser.delete("/delete/:id", ReportController.deleteReport);
routerUser.get("/all", ReportController.getAllReports);
routerUser.get("/status/:statusReport", ReportController.getAllReportsByStatus);

routerUser.get("/allOffices", OfficeController.getAllOffices);
routerUser.post("/newOffice", OfficeController.createOffice);

//ruta provisoria para ponder seedear la base de datos, borrar cuando este la ruta a utilizar
/*
profileRouter.post("/", (req, res) => {

  Users.create(req.body)
    .then((newUser) => {
      res.status(201).json({ message: "Profile created", newUser });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    });
});*/

module.exports = routerUser;
