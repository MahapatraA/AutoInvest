const { getAIResponse } = require("../services/aiService");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ msg: "Message required" });
    }

    const aiResponse = await getAIResponse(message);

    if (aiResponse.error) {
      return res.json({
        message: "AI failed, try again",
        debug: aiResponse
      });
    }

    // 🔥 IMPORTANT: structured response
    res.json({
      message: "Here are some investment options",
      options: aiResponse.options   // 👈 THIS IS KEY
    });

  } catch (err) {
    console.error("CHAT ERROR:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};