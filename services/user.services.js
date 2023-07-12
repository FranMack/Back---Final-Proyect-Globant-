const userModel = require("../models/user.model");

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
  async loginUser(data) {
    try {
      const { email, password } = data;
      const user = await userModel
        .findOne({ email })
        .select("email username salt id first_name last_name");

      if (!user) throw new Error("User not exist");

      if (!user.validPassword(password)) throw new Error("Wrong password");

      const token = jsonwebtoken.sign(
        { data: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );

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
}

module.exports = UserService;
