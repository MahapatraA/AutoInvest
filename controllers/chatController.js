const { getAIResponse } = require("../services/aiService");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    // ✅ validate input
    if (!message) {
      return res.status(400).json({ msg: "Message required" });
    }

    const aiResponse = await getAIResponse(message);

    // ❌ AI failed → return debug info
    if (!aiResponse || aiResponse.error) {
      return res.json({
        message: "AI failed, try again",
        debug: aiResponse
      });
    }

    // ✅ SUCCESS → structured JSON
    res.json({
      investment: aiResponse
    });

  } catch (err) {
    console.error("CHAT ERROR:", err);

    res.status(500).json({
      msg: "Internal server error",
      error: err.message
    });
  }
};