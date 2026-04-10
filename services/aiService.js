const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// helper: extract JSON safely
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
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${GEMINI_API_KEY}`,
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

    // 🔍 Debug logs (very important)
    console.log("FULL GEMINI RESPONSE:", JSON.stringify(response.data));

    const data = response.data;

    // ✅ check candidates
    if (!data || !data.candidates || data.candidates.length === 0) {
      return {
        error: "No candidates returned from Gemini",
        raw: data
      };
    }

    const rawText =
      data.candidates[0]?.content?.parts?.[0]?.text;

    console.log("RAW TEXT:", rawText);

    if (!rawText) {
      return {
        error: "No text returned from Gemini",
        raw: data
      };
    }

    // ✅ extract JSON
    const parsed = extractJSON(rawText);

    if (!parsed) {
      return {
        error: "Invalid JSON from AI",
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
      error: "AI service failed",
      raw: error.response?.data || error.message
    };
  }
};