const ProfileServices = require("../services/profile.services");

const getProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const userProfile = await ProfileServices.getProfile(username);
    res.json(userProfile);
  } catch (error) {
    console.log(error);
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

const updateProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const {
      email,
      phone_number,
      url_img,
      ubication,
      is_admin,
      first_name,
      last_name,
    } = req.body;

    const dataUser = {
      email: email,
      phone_number,
      phone_number,
      url_img: url_img,
      ubication: ubication,
      is_admin: is_admin,
      first_name: first_name,
      last_name: last_name,
    };

    const user = await ProfileServices.updateProfile(username, dataUser);

    res.status(200).json({ message: "Perfil actualizado" });
  } catch (error) {
    console.log(error);
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

module.exports = { getProfile, updateProfile };
