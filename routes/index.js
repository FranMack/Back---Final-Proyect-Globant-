const express = require("express");
const router = express.Router();
const routerUser = require("./user.routes");

router.use("/user", routerUser);

module.exports = router;
