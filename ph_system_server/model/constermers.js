const mongoose = require("mongoose");
const ConstermersSchema = new mongoose.Schema(
  {
    name: { type: String },
    phoneNumber: { type: String },
    invoice: [
      {
        invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
      },
    ],
    discount: { type: Number },
    productSpical: {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
      price: {type:Number},
    },
  },
  {
    timestamps: true,
  }
);
const Constermers = mongoose.model("Constermers", ConstermersSchema);

module.exports = Constermers;
