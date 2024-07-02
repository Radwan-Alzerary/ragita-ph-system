const mongoose = require("mongoose");

const purchasesSchema = new mongoose.Schema(
  {
    invoiceNum: { type: String, default: 0 },
    invoiceDate: { type: Date, index: true }, // Adding an index here
    PaymentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentType",
      index: true,
    }, // Adding an index here
    storge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storge",
      index: true,
    }, // Adding an index here
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
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          index: true,
        }, // Adding an index here
        quantity: { type: Number, default: 0 },
        storageType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Package",
          index: true,
        },
        returned: { type: Number, default: 0 },
        purchasesPrice: { type: Number, default: 0 },
        expireDate: { type: Date },
        purchasesDiscount: { type: Number, default: 0 },
        giftType: { type: String, default: "قطعة" },
        RepresentativeGift: { type: Number, default: 0 },
        bounsPersentage: { type: Number,default:0 },
        gift: { type: Number, default: 0 },
      },
    ],
    moneyGift: { type: Number },
    outfitters: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outfitters",
      index: true,
    }, // Adding an index here
  },
  {
    timestamps: true,
  }
);

// Compound index example:
purchasesSchema.index({ invoiceNum: 1, invoiceDate: -1 });

const Purchases = mongoose.model("Purchases", purchasesSchema);

module.exports = Purchases;
