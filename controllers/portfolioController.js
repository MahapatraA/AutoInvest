const Portfolio = require("../models/Portfolio");

// ✅ Manual Investment
exports.invest = async (req, res) => {
  try {
    const { name, amount, buyPrice } = req.body;

    if (!name || !amount || !buyPrice) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    let portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) {
      portfolio = new Portfolio({ userId: req.user, investments: [] });
    }

    const units = amount / buyPrice;

    portfolio.investments.push({
      name,
      amount,
      buyPrice,
      currentPrice: buyPrice,
      units,
      type: "manual"
    });

    await portfolio.save();

    res.json({ message: "Manual investment added ✅" });
  } catch (err) {
    console.error("INVEST ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🤖 Auto Invest (AI)
exports.autoInvest = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const { options, totalAmount } = req.body;

    if (!options || !Array.isArray(options) || !totalAmount) {
      return res.status(400).json({ msg: "Invalid input" });
    }

    let portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) {
      portfolio = new Portfolio({ userId: req.user, investments: [] });
    }

    for (let opt of options) {
      if (!opt.name || !opt.allocation) continue;

      const investAmount = (opt.allocation / 100) * totalAmount;

      // Simulated price (replace later with real API)
      const price = 100 + Math.random() * 50;
      const units = investAmount / price;

      portfolio.investments.push({
        name: opt.name,
        amount: investAmount,
        buyPrice: price,
        currentPrice: price,
        units,
        type: "AI"
      });
    }

    await portfolio.save();

    res.json({ message: "Auto investment completed 🚀" });
  } catch (err) {
    console.error("AUTO INVEST ERROR:", err);
    res.status(500).json({ msg: "Auto invest failed" });
  }
};

// 📊 Basic Portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) {
      return res.json({ investments: [], totalValue: 0 });
    }

    const investments = portfolio.investments.map(inv => {
      const currentValue = inv.units * inv.currentPrice;
      const returns = currentValue - inv.amount;

      return {
        ...inv._doc,
        currentValue,
        returns
      };
    });

    const totalValue = investments.reduce(
      (sum, inv) => sum + inv.currentValue,
      0
    );

    res.json({ investments, totalValue });
  } catch (err) {
    console.error("GET PORTFOLIO ERROR:", err);
    res.status(500).json({ msg: "Error fetching portfolio" });
  }
};

// 📈 Detailed Portfolio Analytics
exports.getDetailed = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) {
      return res.json({ investments: [], summary: {} });
    }

    const detailed = portfolio.investments.map(inv => {
      const currentValue = inv.units * inv.currentPrice;
      const returns = currentValue - inv.amount;
      const returnPercent =
        inv.amount > 0 ? (returns / inv.amount) * 100 : 0;

      return {
        name: inv.name,
        type: inv.type,
        amount: inv.amount,
        units: inv.units,
        buyPrice: inv.buyPrice,
        currentPrice: inv.currentPrice,
        currentValue,
        returns,
        returnPercent
      };
    });

    const totalInvested = detailed.reduce(
      (sum, inv) => sum + inv.amount,
      0
    );

    const totalCurrent = detailed.reduce(
      (sum, inv) => sum + inv.currentValue,
      0
    );

    const totalReturns = totalCurrent - totalInvested;

    res.json({
      investments: detailed,
      summary: {
        totalInvested,
        totalCurrent,
        totalReturns,
        returnPercent:
          totalInvested > 0
            ? (totalReturns / totalInvested) * 100
            : 0
      }
    });
  } catch (err) {
    console.error("GET DETAILED ERROR:", err);
    res.status(500).json({ msg: "Error fetching detailed portfolio" });
  }
};

// 🔄 Simulate Market Price Updates
exports.updatePrices = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) {
      return res.json({ message: "No portfolio found" });
    }

    portfolio.investments.forEach(inv => {
      const change = 1 + (Math.random() * 0.1 - 0.05);
      inv.currentPrice = inv.currentPrice * change;
    });

    await portfolio.save();

    res.json({ message: "Prices updated 📈" });
  } catch (err) {
    console.error("PRICE UPDATE ERROR:", err);
    res.status(500).json({ msg: "Price update failed" });
  }
};