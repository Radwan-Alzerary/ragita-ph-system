const mongoose = require("mongoose");
const PaymentTypeSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);
const PaymentType = mongoose.model("PaymentType", PaymentTypeSchema);

module.exports = PaymentType;
