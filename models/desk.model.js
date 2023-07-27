const mongoose = require("mongoose");

const deskSchema = new mongoose.Schema(
  {
    deskNumber: {
      type: Number,
      required: true,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);
const deskModel = mongoose.model("desk", deskSchema);
module.exports = deskSchema;
