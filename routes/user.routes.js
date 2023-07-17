const express = require("express");
const UserController = require("../controllers/user.controllers");
const { auth } = require("../midlewares/auth.midlewares");

const routerUser = express.Router();

routerUser.post("/register", UserController.createUser);

routerUser.post("/login", UserController.loginUser);

routerUser.get("/profile/:username", UserController.getProfile);

routerUser.put("/profile/:username", UserController.updateProfile);

routerUser.get("/info", auth, UserController.getInfo);

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
