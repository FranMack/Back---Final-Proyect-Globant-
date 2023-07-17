const userModel = require("../models/user.model");
const jsonwebtoken = require("jsonwebtoken");
const responseHandler = require("../handlers/response.handler");
const { generateToken } = require("../configs/token.config");

class UserService {
  async createUser(data) {
    try {
      const existingUser = await userModel.findOne({ email: data.email });

      if (existingUser) {
        throw new Error("Email already exists");
      }

      const newUser = new userModel(data);
      await newUser.setPassword(data.password);
      return await newUser.save();
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }
  async loginUser(res, data) {
    try {
      const { email, password } = data;
      const user = await userModel
        .findOne({ email })
        .select("email username password salt id first_name last_name");

      if (!user) return responseHandler.badrequest(res, "User not exist");
      const validPassword = await user.validPassword(password);

      if (!validPassword)
        return responseHandler.badrequest(res, "Wrong password");
      const token = generateToken(user);
      console.log(token);
      user.password = undefined;
      user.salt = undefined;

      return {
        token,
        ...user._doc,
        id: user.id,
      };
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }
  static async getProfile(username) {
    try {
      const userProfile = await userModel.find({ username: username });

      if (userProfile.length === 0) {
        throw new Error("Usuario no encontrado");
      }

      return userProfile;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateProfile(username, dataUser) {
    try {
      const user = await userModel.findOne({ username: username });
      const {
        email,
        phone_number,
        url_img,
        ubication,
        is_admin,
        first_name,
        last_name,
      } = dataUser;

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      user.email = email;
      user.first_name = first_name;
      user.last_name = last_name;
      user.phone_number = phone_number;
      user.url_img = url_img;
      user.ubication = ubication;
      user.is_admin = is_admin || false;
      return user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getInfo(userId) {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch {
      throw new Error("Error retrieving user information");
    }
  }
}

module.exports = UserService;
