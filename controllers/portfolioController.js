const Portfolio = require("../models/Portfolio");

// 🟢 Manual Invest (fixing your existing one too)
exports.invest = async (req, res) => {
  try {
    const { name, amount, buyPrice } = req.body;

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

    res.json({ message: "Manual investment added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🤖 AUTO INVEST (from AI)
exports.autoInvest = async (req, res) => {
  try {
    const { options, totalAmount } = req.body;

    let portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) {
      portfolio = new Portfolio({ userId: req.user, investments: [] });
    }

    for (let opt of options) {
      const investAmount = (opt.allocation / 100) * totalAmount;

      // 🔴 Replace later with real API
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
    console.error(err);
    res.status(500).json({ msg: "Auto invest failed" });
  }
};

// 📊 GET PORTFOLIO (with calculations)
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) return res.json({ investments: [], totalValue: 0 });

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
    console.error(err);
    res.status(500).json({ msg: "Error fetching portfolio" });
  }
};

// 🔄 UPDATE PRICES (simulate market)
exports.updatePrices = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user });

    if (!portfolio) return res.json({ message: "No portfolio" });

    portfolio.investments.forEach(inv => {
      const change = 1 + (Math.random() * 0.1 - 0.05);
      inv.currentPrice = inv.currentPrice * change;
    });

    await portfolio.save();

    res.json({ message: "Prices updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Price update failed" });
  }
};