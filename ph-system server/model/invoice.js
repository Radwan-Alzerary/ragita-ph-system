const mongoose = require("mongoose");
const InvoiceSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    type: { type: String },
    active: { type: Boolean },
    costemer: { type: mongoose.Schema.Types.ObjectId, ref: "Constermers" },
    requestQueue: { type: mongoose.Schema.Types.ObjectId, ref: "RequestQueue" },
    product: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        storageType: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
        custemPrice: { type: Number },
        ProductCost: { type: Number },
        quantity: { type: Number },
        discount: { type: Number },
        discountType: { type: String },
      },
    ],
    returnProduct: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
    systemdiscounts: { type: Number },
    fullcost: { type: Number, default: 0 },
    fullPrice: { type: Number, default: 0 },
    finalcost: { type: Number, default: 0 },
    finalprice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    amountPaid : {type:Number, default: 0},
    progressdate: { type: Date },
    returnedInvoice: { type: Boolean },
    returnedItem: { type: Boolean },
    paymentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentType",
    },
  },
  {
    timestamps: true,
  }
);
InvoiceSchema.pre("save", function (next) {
  // Get the current date and time
  const currentDate = new Date();

  // Set the progressdata field to the current date and time in UTC+03:00
  currentDate.setHours(currentDate.getHours() + 3);
  this.progressdata = currentDate;

  next();
});

const invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = invoice;
