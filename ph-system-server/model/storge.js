const mongoose = require("mongoose");

const StorgeSchema = new mongoose.Schema(
  {
    name: { type: String },
    defult: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Storge = mongoose.model("Storge", StorgeSchema);

module.exports = Storge; // Correctly export the Storge model
