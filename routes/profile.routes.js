const express = require("express");
const profileRouter = express.Router();
const Users = require("../models/user.model");
const ProfileControllers = require("../controllers/profile.controllers");

profileRouter.get("/profile/:username", ProfileControllers.getProfile);

profileRouter.put("/profile/:username", ProfileControllers.updateProfile);



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

module.exports = profileRouter;
