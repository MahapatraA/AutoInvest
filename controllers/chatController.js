const User = require("../models/User");
const { getAdvice } = require("../services/aiService");

exports.chat = async (req, res) => {
  const { message } = req.body;

  const user = await User.findById(req.user);

  const aiResponse = await getAdvice(message, user);

  res.json(aiResponse);
};