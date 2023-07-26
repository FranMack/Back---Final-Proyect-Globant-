const mongoose = require("mongoose");
const modelOptions = require("./model.options");
const deskSchema = require("./desk.model");

const officeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    latitude: {
      type: Number,
      require: true,
    },
    longitude: {
      type: Number,
      require: true,
    },

    desks: [deskSchema],
  },
  {}
);

const officeModel = mongoose.model("Office", officeSchema);

module.exports = officeModel;
