const mongoose = require("mongoose");
const modelOptions = require("./model.options");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    url_img: {
      type: String,
      required: false,
    },
    phone_number: {
      type: String,
      required: false,
    },
    ubication: {
      type: String,
      requerid: true,
    },
    genre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    is_admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,

       required: true,
      select: false, 

      required: false,
      select: false,

    },
  },
  { modelOptions }
);

userSchema.methods.setPassword = async function (password) {
  const salt = bcrypt.genSaltSync(8);
  this.salt = salt;

  this.password = await bcrypt.hash(password, this.salt);
};

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
