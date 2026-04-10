const User = require("../models/User");
const { getAIResponse } = require("../services/aiService");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ msg: "Message required" });
    }

    const aiResponse = await getAIResponse(message);

    // handle AI error
    if (aiResponse.error) {
      return res.json({
        message: "AI failed, try again",
        raw: aiResponse.raw || null
      });
    }

    // SUCCESS → structured response
    res.json({
      investment: aiResponse
    });

  } catch (err) {
    console.error("CHAT ERROR:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};