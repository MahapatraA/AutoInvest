const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  currentValue: Number,
  returns: Number,
  createdAt: { type: Date, default: Date.now }
});

const portfolioSchema = new mongoose.Schema({
  userId: String,
  investments: [investmentSchema]
});

module.exports = mongoose.model("Portfolio", portfolioSchema);