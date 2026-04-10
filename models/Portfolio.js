const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  name: String,
  amount: Number,

  // Fields used by portfolio controller/detailed analytics
  allocation: { type: Number, default: 0 },
  investedAmount: { type: Number, default: 0 },
  currentValue: { type: Number, default: 0 },
  returns: { type: Number, default: 0 },

  // NEW FIELDS
  units: { type: Number, default: 0 },
  buyPrice: { type: Number, default: 0 },
  currentPrice: { type: Number, default: 0 },

  type: { type: String, default: "manual" }, // "AI" or "manual"

  createdAt: { type: Date, default: Date.now }
});

const portfolioSchema = new mongoose.Schema({
  user: { type: String, index: true },
  userId: String,
  investments: [investmentSchema]
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
