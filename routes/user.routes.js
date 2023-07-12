const express = require("express");
const routerUser = express.Router();

const UserController = require("../controllers/user.controllers")


routerUser.post("/register", UserController.createUser);

routerUser.get("/profile/:username", UserController.getProfile);

routerUser.put("/profile/:username", UserController.updateProfile);


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