const express = require("express");
const router = express.Router();
const routerUser = require("./user.routes");

router.use("/user", routerUser);
router.use("/report", routerUser);
router.use("/office", routerUser);

module.exports = router;
