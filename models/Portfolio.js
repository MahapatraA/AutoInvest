const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  name: String,
  amount: Number,

  // NEW FIELDS
  units: { type: Number, default: 0 },
  buyPrice: { type: Number, default: 0 },
  currentPrice: { type: Number, default: 0 },

  type: { type: String, default: "manual" }, // "AI" or "manual"

  createdAt: { type: Date, default: Date.now }
});

const portfolioSchema = new mongoose.Schema({
  userId: String,
  investments: [investmentSchema]
});

module.exports = mongoose.model("Portfolio", portfolioSchema);