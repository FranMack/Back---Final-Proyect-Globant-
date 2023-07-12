const express = require("express");
const router = express.Router();
const profileRoute = require("./profile.routes");

router.use("/user", profileRoute);

module.exports = router;
