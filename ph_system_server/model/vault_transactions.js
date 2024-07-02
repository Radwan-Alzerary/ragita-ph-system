// vault_transactions.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vault_transactionsSchema = new Schema(
  {
    vault_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vault', // Reference to the Vault model
      required: true
    },
    transaction_type: {
      type: String,
      enum: ["deposit", "withdrawal"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    transaction_date: {
      type: Date,
      default: Date.now,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Vault_transactions = mongoose.model(
  "Vault_transactions",
  vault_transactionsSchema
);

module.exports = Vault_transactions;
