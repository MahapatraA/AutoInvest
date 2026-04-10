const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

exports.getRecommendation = async (investment) => {
  try {
    const prompt = `
Fund: ${investment.name}
Invested: ${investment.amount}
Current: ${investment.currentValue}
Returns: ${investment.returns}

Suggest HOLD / EXIT / BUY MORE.

Return ONLY JSON:
{
  "action": "",
  "reason": ""
}
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are a financial advisor." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;

    try {
      return JSON.parse(text);
    } catch {
      return {
        error: "Invalid JSON",
        raw: text
      };
    }

  } catch (err) {
    console.error("RECOMMENDATION ERROR:", err.response?.data || err.message);

    return {
      error: "AI failed",
      raw: err.response?.data || err.message
    };
  }
};