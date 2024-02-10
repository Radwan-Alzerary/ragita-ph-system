const mongoose = require("mongoose");
const ManufactorSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);
const Manufactor = mongoose.model("Manufactor", ManufactorSchema);

module.exports = Manufactor;
