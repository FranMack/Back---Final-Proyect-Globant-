const UserService = require("../services/user.services");
const responseHandler = require("../handlers/response.handler");
const { body, validationResult } = require("express-validator");
const { generateToken } = require("../configs/token.config");

class UserController {
  static async createUser(req, res) {
    try {
      await body("first_name")
        .notEmpty()
        .withMessage("firstname is required")
        .isLength({ min: 1 })
        .withMessage("firstname minimum 1 character")
        .run(req);

      await body("last_name")
        .notEmpty()
        .withMessage("lastname is required")
        .isLength({ min: 1 })
        .withMessage("lastname minimum 1 character")
        .run(req);

      await body("location")
        .notEmpty()
        .withMessage("location is required")
        .isLength({ min: 1 })
        .withMessage("location minimum 1 character")
        .run(req);

      await body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email")
        .run(req);

      await body("username")
        .notEmpty()
        .withMessage("username is required")
        .isLength({ min: 4 })
        .withMessage("username minimum 4 character")
        .run(req);

      await body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password minimum 8 character")
        .matches(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage("password must contain at least one special character")
        .matches(/\d/)
        .withMessage("password must contain at least one number")
        .matches(/[a-z]/)
        .withMessage("password must contain at least one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("password must contain at least one capital letter")
        .run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userData = req.body;
      const userService = new UserService();
      const user = await userService.createUser(userData);
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userService = new UserService();
      const user = await userService.loginUser(email);

      if (!user) return responseHandler.badrequest(res, "User not exist");
      const validPassword = await user.validPassword(password);

      if (!validPassword)
        return responseHandler.badrequest(res, "Wrong password");
      const token = generateToken(user);

      user.password = undefined;
      user.salt = undefined;

      const resultUser = {
        token,
        ...user._doc,
        id: user.id,
      };

      res.status(201).json(resultUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getProfile = async (req, res) => {
    try {
      const username = req.params.username;

      const userProfile = await UserService.getProfile(username);
      res.json(userProfile);
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const username = req.params.username;

      const {
        email,
        phone_number,
        url_img,
        location,
        is_admin,
        first_name,
        last_name,
      } = req.body;

      const dataUser = {
        email: email,
        phone_number,
        phone_number,
        url_img: url_img,
        location: location,
        is_admin: is_admin,
        first_name: first_name,
        last_name: last_name,
      };

      const user = await UserService.updateProfile(username, dataUser);

      res.status(200).json({ message: "Perfil actualizado" });
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        res.status(404).json({ error: "Usuario no encontrado" });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  };

  static getInfo = async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await UserService.getInfo(userId);
      if (!user) return responseHandler.notfound(res);
      responseHandler.ok(res, user);
    } catch {
      responseHandler.error(res);
    }
  };
}

module.exports = UserController;
