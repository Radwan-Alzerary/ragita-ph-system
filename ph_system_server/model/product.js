const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      scientificName: { type: String },
      tradeName: { type: String },
      anotherName: { type: String },
    },
    specialCode: { type: String },
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
    active:{type:Boolean,default: true},
    sellamount: { type: Number, default: 0 },
    outfitters: [
      {
        equipped: { type: mongoose.Schema.Types.ObjectId, ref: "Manufactor" },
        amount: { type: Number },
        purchasingPrice: { type: Number },
        purchasingdate: { type: Date },
        freeItem: { type: Number },
        bounse: { type: Number },
      },
    ],
    specialBarcode: { type: String },
    manufacturBarcode: { type: String },
    image: { type: String },
    discountType: { type: String },
    discount: { type: Number },
    expireDate:{type:Date},
    quantity: { type: Number },
    unlimit: { type: Boolean },
    defaultPackaging: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    storge: { type: mongoose.Schema.Types.ObjectId, ref: "Storge" },
    manufactor: { type: mongoose.Schema.Types.ObjectId, ref: "Manufactor" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Manufactor" },
    countery: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Manufactor" },
    favorite: { type: Boolean,default:false },
    prices: [
      {
        packaging: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
        singlePrice: { type: Number },
        wholesalePrice: { type: Number },
        filling : {type:Number},
        quantity:{type:Number},
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
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
