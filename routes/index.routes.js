const express = require("express")
const router =  express.Router();
const users = require("./user.routes")

router.use("/users", users)

module.exports = router;