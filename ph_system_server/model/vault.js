const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Correct type definition for string
    },
    opening_balance: {
      type: Number, // Correct type definition for number
    },
    current_balance: {
      type: Number, // Correct type definition for number
    },
  },
  {
    timestamps: true,
  }
);

const Vault = mongoose.model("Vault", vaultSchema);
module.exports = Vault;
