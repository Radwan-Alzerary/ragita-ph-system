const mongoose = require("mongoose");
const purchasesSchema = new mongoose.Schema(
  {
    invoiceNum: { type: String, default: 0 },
    invoiceDate: { type: Date },
    PaymentType: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentType" },
    storge: { type: mongoose.Schema.Types.ObjectId, ref: "Storge" },
    fullCost: { type: String },
    fullquantity: { type: String },
    fulldiscount: { type: String },
    fullgift: { type: String },
    fullreturn: { type: String },
    fullprice: { type: String },
    active: { type: String },
    state: { type: String },
    product: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 0 },
        returned: { type: Number, default: 0 },
        purchasesPrice: { type: Number, default: 0 },
        purchasesDiscount: { type: Number, default: 0 },
        RepresentativeGift: { type: Number, default: 0 },
        bounsPersentage: { type: Number },

        gift: { type: Number, default: 0 },
      },
    ],
    moneyGift: { type: Number },
    outfitters: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outfitters",
    },
  },
  {
    timestamps: true,
  }
);
const Purchases = mongoose.model("Purchases", purchasesSchema);

module.exports = Purchases;
