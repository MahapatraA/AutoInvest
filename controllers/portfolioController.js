const Portfolio = require("../models/Portfolio");


// ✅ Manual Investment
const invest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, amount } = req.body;

    if (!name || !amount) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    let portfolio = await Portfolio.findOne({ user: userId });

    const newInvestment = {
      name,
      allocation: 100,
      investedAmount: amount,
      currentValue: amount,
      returns: 0
    };

    if (!portfolio) {
      portfolio = new Portfolio({
        user: userId,
        investments: [newInvestment]
      });
    } else {
      portfolio.investments.push(newInvestment);
    }

    await portfolio.save();

    res.json({
      msg: "Investment added",
      investment: newInvestment
    });

  } catch (err) {
    console.error("INVEST ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// ✅ Get Basic Portfolio
const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res.json({ investments: [] });
    }

    res.json(portfolio);

  } catch (err) {
    console.error("GET PORTFOLIO ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// ✅ Get Detailed Portfolio (with totals)
const getDetailed = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res.json({
        totalInvested: 0,
        totalCurrent: 0,
        totalReturns: 0,
        investments: []
      });
    }

    let totalInvested = 0;
    let totalCurrent = 0;

    portfolio.investments.forEach(inv => {
      totalInvested += inv.investedAmount;
      totalCurrent += inv.currentValue;
    });

    const totalReturns = totalCurrent - totalInvested;

    res.json({
      totalInvested,
      totalCurrent,
      totalReturns,
      investments: portfolio.investments
    });

  } catch (err) {
    console.error("GET DETAILED ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// ✅ Auto Invest (AI → Portfolio)
const autoInvest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { options, totalAmount } = req.body;

    if (!options || !totalAmount) {
      return res.status(400).json({ msg: "Missing data" });
    }

    const investments = options.map(opt => ({
      name: opt.name,
      allocation: opt.allocation,
      investedAmount: (opt.allocation / 100) * totalAmount,
      currentValue: (opt.allocation / 100) * totalAmount,
      returns: 0
    }));

    let portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      portfolio = new Portfolio({
        user: userId,
        investments
      });
    } else {
      portfolio.investments.push(...investments);
    }

    await portfolio.save();

    res.json({
      msg: "Auto investment successful",
      investments
    });

  } catch (err) {
    console.error("AUTO INVEST ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// ✅ Simulate Price Updates (for demo)
const updatePrices = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolio = await Portfolio.findOne({ user: userId });

    if (!portfolio) {
      return res.status(404).json({ msg: "No portfolio found" });
    }

    portfolio.investments = portfolio.investments.map(inv => {
      const change = (Math.random() * 10 - 5) / 100; // -5% to +5%
      const newValue = inv.currentValue * (1 + change);

      return {
        ...inv.toObject(),
        currentValue: newValue,
        returns: newValue - inv.investedAmount
      };
    });

    await portfolio.save();

    res.json({
      msg: "Prices updated",
      investments: portfolio.investments
    });

  } catch (err) {
    console.error("UPDATE PRICE ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// ✅ EXPORT EVERYTHING (IMPORTANT)
module.exports = {
  invest,
  getPortfolio,
  getDetailed,
  autoInvest,
  updatePrices
};