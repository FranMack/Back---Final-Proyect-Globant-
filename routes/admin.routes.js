const express = require("express");
const UserAdmincontroller = require("../controllers/userAdmin.controllers");
const routerAdmin = express.Router();

routerAdmin.get("/users-list", UserAdmincontroller.listUsers)





const Users = require("../models/user.model");

//provisoriamente



routerAdmin.get("/search", (req, res) => {
  

  const searchValue = req.query.searchValue;
  const regex = new RegExp(searchValue, "i");

  Users.find({
    $or: [
      { email: regex },
      { first_name: regex },
      { last_name: regex },
      { username: regex }
    ]
  })
    .then((users) => res.json(users))
    .catch((error) => {
      console.log(error);
    });
});


routerAdmin.get("/search-location", (req, res) => {
  

    const searchValue = req.query.searchValue;
    const regex = new RegExp(searchValue, "i");
  
    Users.find({
     location:regex
    })
      .then((users) => res.json(users))
      .catch((error) => {
        console.log(error);
      });
  });



module.exports = routerAdmin;
