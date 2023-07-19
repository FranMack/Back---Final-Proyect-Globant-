const { body } = require("express-validator");
exports.loginValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("email").notEmpty().withMessage("Email cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
