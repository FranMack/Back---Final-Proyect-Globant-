const userModel = require("../models/user.model");

class UserService {
  async createUser(data) {
    try {
      const newUser = new userModel(data);
      await newUser.setPassword(data.password);
      return await newUser.save();
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }
  async loginUser(email) {
    try {
      const user = await userModel
        .findOne({ email })
        .select(
          "email username password salt id first_name last_name location phone_number"
        );

      return user;
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
        location,
        is_admin,
        first_name,
        last_name,
        office,
      } = dataUser;

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      user.email = email;
      user.first_name = first_name;
      user.last_name = last_name;
      user.phone_number = phone_number;
      user.url_img = url_img;
      user.location = location;
      user.is_admin = is_admin || false;
      user.office = office;
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
