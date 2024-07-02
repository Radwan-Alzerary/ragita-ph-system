const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      index: true, // Index on number field
    },
    type: { type: String, index: true }, // Index on type field
    active: { type: Boolean },
    costemer: { type: mongoose.Schema.Types.ObjectId, ref: "Constermers" },
    requestQueue: { type: mongoose.Schema.Types.ObjectId, ref: "RequestQueue" },
    ubdateDate: [{ type: Date }],
    oldInvoice: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
        editDate: { type: Date },
      },
    ],
    product: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        storageType: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
        custemPrice: { type: Number },
        ProductCost: { type: Number },
        quantity: { type: Number },
        price: { type: Number },
        discount: { type: Number },
        discountType: { type: String },
      },
    ],
    returnProduct: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        storageType: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    systemdiscounts: { type: Number },
    fullcost: { type: Number, default: 0 },
    fullPrice: { type: Number, default: 0 },
    finalcost: { type: Number, default: 0 },
    finalprice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 },
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

InvoiceSchema.index({ number: 1, type: 1 }); // Compound index on number and type fields

InvoiceSchema.pre("save", function (next) {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 3);
  this.progressdate = currentDate;
  next();
});

const invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = invoice;
