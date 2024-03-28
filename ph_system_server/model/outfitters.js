const mongoose = require("mongoose");
const outfittersSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

const Outfitters = mongoose.model("Outfitters", outfittersSchema);
module.exports = Outfitters;
