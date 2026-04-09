const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  invest,
  getPortfolio,
  getDetailed
} = require("../controllers/portfolioController");

router.post("/invest", auth, invest);
router.get("/", auth, getPortfolio);
router.get("/detailed", auth, getDetailed);

module.exports = router;