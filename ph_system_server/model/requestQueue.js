const mongoose = require("mongoose");
const RequestQueueSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    invoice: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
    paymentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentType",
    },
    type: { type: String, default: "normal" },
    storgeType: { type: mongoose.Schema.Types.ObjectId, ref: "Storge" },
    active: { type: Boolean, default: true },
    type: { type: String },
    currentUserName: { type: String, default: "" },
    currentUserPhoneNumber: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
const RequestQueue = mongoose.model("RequestQueue", RequestQueueSchema);

module.exports = RequestQueue;
