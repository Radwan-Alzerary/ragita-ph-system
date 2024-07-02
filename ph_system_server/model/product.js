const mongoose = require("mongoose");
const Purchases = require("./purchases");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      scientificName: { type: String, index: true },
      tradeName: { type: String, index: true },
      anotherName: { type: String },
    },
    specialCode: { type: String, index: true },
    specifications: {
      generalInformation: { type: String },
      medicalInformation: { type: String },
      sideEffects: { type: String },
      numberOfDoses: { type: String },
      comments: { type: String },
    },
    purchasingPrice: { type: Number },
    lessamount: { type: Number, default: 0 },
    rackNumber: { type: String },
    active: { type: Boolean, default: true, index: true },
    sellamount: { type: Number, default: 0 },
    firstOutfitters: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outfitters",
      index: true,
    },
    specialBarcode: { type: String },
    manufacturBarcode: { type: String },
    image: { type: String },
    discountType: { type: String },
    discount: { type: Number },
    expireDate: { type: Date, index: true },
    quantity: { type: Number, index: true },
    unlimit: { type: Boolean },
    purchasesData: [
      {
        expireDate: { type: String },
        quantity: { type: Number },
        package: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
        cost: { type: Number },
        Purchases: { type: mongoose.Schema.Types.ObjectId, ref: "Purchases" },
      },
    ],
    defaultPackaging: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    storge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storge",
      index: true,
    },
    manufactor: { type: mongoose.Schema.Types.ObjectId, ref: "Manufactor" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Manufactor" },
    countery: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Manufactor" },
    favorite: { type: Boolean, default: false, index: true },
    prices: [
      {
        packaging: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
        singlePrice: { type: Number },
        wholesalePrice: { type: Number },
        filling: { type: Number },
        quantity: { type: Number },
        specialPrice: { type: Number },
        singleProfitPercentage: { type: Number },
        wholeProfitPercentage: { type: Number },
        specialProfitPercentage: { type: Number },
        amount: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index example:
ProductSchema.index({ "name.tradeName": 1, expireDate: -1 });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
