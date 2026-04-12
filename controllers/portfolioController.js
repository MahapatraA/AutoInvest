const Portfolio = require("../models/Portfolio");

const findPortfolioByUser = async (userId) => {
  return Portfolio.findOne({ $or: [{ user: userId }, { userId }] });
};

const getInvestmentAmount = (investment = {}) => {
  const investedAmount = Number(investment.investedAmount);
  if (Number.isFinite(investedAmount) && investedAmount > 0) {
    return investedAmount;
  }

  const amount = Number(investment.amount);
  if (Number.isFinite(amount) && amount > 0) {
    return amount;
  }

  return 0;
};

const getVisibleInvestments = (investments = []) =>
  investments
    .filter((investment) => getInvestmentAmount(investment) > 0)
    .sort((a, b) => getInvestmentAmount(b) - getInvestmentAmount(a));


// ✅ Manual Investment
const invest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, amount } = req.body;
    const numericAmount = Number(amount);

    if (!name || Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    let portfolio = await findPortfolioByUser(userId);

    const newInvestment = {
      name,
      allocation: 100,
      investedAmount: numericAmount,
      currentValue: numericAmount,
      returns: 0
    };

    if (!portfolio) {
      portfolio = new Portfolio({
        user: userId,
        userId,
        investments: [newInvestment]
      });
    } else {
      portfolio.user = portfolio.user || userId;
      portfolio.userId = portfolio.userId || userId;
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

    const portfolio = await findPortfolioByUser(userId);

    if (!portfolio) {
      return res.json({ investments: [] });
    }

    const visibleInvestments = getVisibleInvestments(portfolio.investments);

    res.json({
      ...portfolio.toObject(),
      investments: visibleInvestments
    });

  } catch (err) {
    console.error("GET PORTFOLIO ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// ✅ Get Detailed Portfolio (with totals)
const getDetailed = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolio = await findPortfolioByUser(userId);

    if (!portfolio) {
      return res.json({
        totalInvested: 0,
        totalCurrent: 0,
        totalReturns: 0,
        investments: []
      });
    }

    const visibleInvestments = getVisibleInvestments(portfolio.investments);
    let totalInvested = 0;
    let totalCurrent = 0;

    visibleInvestments.forEach(inv => {
      totalInvested += Number(inv.investedAmount || inv.amount || 0);
      totalCurrent += Number(inv.currentValue || inv.investedAmount || inv.amount || 0);
    });

    const totalReturns = totalCurrent - totalInvested;

    res.json({
      totalInvested,
      totalCurrent,
      totalReturns,
      investments: visibleInvestments
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
    const numericTotalAmount = Number(totalAmount);

    if (!Array.isArray(options) || Number.isNaN(numericTotalAmount) || numericTotalAmount <= 0) {
      return res.status(400).json({ msg: "Missing data" });
    }

    const investments = options.map(opt => ({
      name: opt.name,
      allocation: opt.allocation,
      investedAmount: (opt.allocation / 100) * numericTotalAmount,
      currentValue: (opt.allocation / 100) * numericTotalAmount,
      returns: 0
    }));

    let portfolio = await findPortfolioByUser(userId);

    if (!portfolio) {
      portfolio = new Portfolio({
        user: userId,
        userId,
        investments
      });
    } else {
      portfolio.user = portfolio.user || userId;
      portfolio.userId = portfolio.userId || userId;
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

    const portfolio = await findPortfolioByUser(userId);

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

    const visibleInvestments = getVisibleInvestments(portfolio.investments);

    res.json({
      msg: "Prices updated",
      investments: visibleInvestments
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
