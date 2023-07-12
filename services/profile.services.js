const Users = require("../models/user.model");

class ProfileServices {
  static async getProfile(username) {
    try {
      const userProfile = await Users.find({ username: username });

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
      const user = await Users.findOne({ username: username });
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

module.exports = ProfileServices;
