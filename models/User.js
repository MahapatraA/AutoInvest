const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  riskProfile: { type: String, default: "medium" },
  monthlyInvestment: { type: Number, default: 5000 }
});

module.exports = mongoose.model("User", userSchema);