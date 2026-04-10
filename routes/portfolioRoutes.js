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

router.post("/invest", auth, invest);
router.get("/", auth, getPortfolio);
router.get("/detailed", auth, getDetailed);
router.post("/auto-invest", auth, autoInvest);   // NEW
router.post("/update-prices", auth, updatePrices); // NEW

module.exports = router;