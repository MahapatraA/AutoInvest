const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.getRecommendation = async (investment) => {
  try {
    const prompt = `
Fund: ${investment.name}
Invested: ${investment.amount}
Current: ${investment.currentValue}
Returns: ${investment.returns}

Suggest HOLD / EXIT / BUY MORE with reason.

Return ONLY JSON:
{
  "action": "",
  "reason": ""
}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const content =
      response.data.candidates[0].content.parts[0].text;

    try {
      return JSON.parse(content);
    } catch (err) {
      return {
        error: "Invalid AI response",
        raw: content
      };
    }

  } catch (error) {
    console.error("GEMINI ERROR:", error.response?.data || error.message);

    return {
      error: "AI service failed"
    };
  }
};