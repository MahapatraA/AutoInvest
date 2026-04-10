const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// helper to safely extract JSON
const extractJSON = (text) => {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
};

exports.getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a professional financial advisor.

User: ${message}

Suggest investment allocation.

Return ONLY valid JSON:
{
  "options": [
    { "name": "Nifty 50", "allocation": 50 },
    { "name": "Gold", "allocation": 50 }
  ]
}

Rules:
- allocations must sum to 100
- no explanation outside JSON
`
              }
            ]
          }
        ]
      }
    );

    const rawText =
      response.data.candidates[0].content.parts[0].text;

    const parsed = extractJSON(rawText);

    if (!parsed) {
      return {
        error: "Invalid AI response",
        raw: rawText
      };
    }

    return parsed;

  } catch (error) {
    console.error(
      "GEMINI ERROR:",
      error.response?.data || error.message
    );

    return {
      error: "AI service temporarily unavailable"
    };
  }
};