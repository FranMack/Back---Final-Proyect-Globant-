const express = require("express");
const router = express.Router();
const routerUser = require("./user.routes");
const routerReport = require("./reports.routes");
const routerOffice = require("./office.routes");
const routerAdmin = require("./admin.routes")

router.use("/user", routerUser);
router.use("/report", routerReport);
router.use("/office", routerOffice);
router.use("/userAdmin", routerAdmin )

module.exports = router;
