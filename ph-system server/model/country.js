const mongoose = require("mongoose");
const countrySchema = new mongoose.Schema(
  {
    name: { type: String },
    productInsideCount:{type:Number,default:1}
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
