const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  invest,
  getPortfolio,
  getDetailed,
  autoInvest,
  updatePrices
} = require("../controllers/portfolioController");

// Manual investment
router.post("/invest", auth, invest);

// AI auto investment
router.post("/auto-invest", auth, autoInvest);

// Update simulated prices
router.post("/update-prices", auth, updatePrices);

// Basic portfolio
router.get("/", auth, getPortfolio);

// Detailed analytics
router.get("/detailed", auth, getDetailed);

module.exports = router;