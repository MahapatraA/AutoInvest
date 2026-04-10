exports.autoInvest = async (req, res) => {
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

    // save to DB (example)
    const Portfolio = require("../models/Portfolio");

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
      msg: "Investment successful",
      investments
    });

  } catch (err) {
    console.error("AUTO INVEST ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};