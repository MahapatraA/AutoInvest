const Portfolio = require("../models/Portfolio");
const { getRecommendation } = require("../services/recommendationService");

exports.invest = async (req, res) => {
  const { selectedFunds, amount } = req.body;

  let portfolio = await Portfolio.findOne({ userId: req.user });

  if (!portfolio) {
    portfolio = new Portfolio({ userId: req.user, investments: [] });
  }

  selectedFunds.forEach(fund => {
    const investAmount = amount / selectedFunds.length;

    const growth = 1 + (Math.random() * 0.2 - 0.1);
    const currentValue = investAmount * growth;

    portfolio.investments.push({
      name: fund,
      amount: investAmount,
      currentValue,
      returns: currentValue - investAmount
    });
  });

  await portfolio.save();

  res.json({ message: "Investment done" });
};

exports.getPortfolio = async (req, res) => {
  const portfolio = await Portfolio.findOne({ userId: req.user });
  res.json(portfolio);
};

exports.getDetailed = async (req, res) => {
  const portfolio = await Portfolio.findOne({ userId: req.user });

  if (!portfolio) return res.json([]);

  const data = await Promise.all(
    portfolio.investments.map(async inv => {
      const recommendation = await getRecommendation(inv);

      return {
        ...inv._doc,
        recommendation
      };
    })
  );

  res.json(data);
};