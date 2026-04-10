const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a financial advisor. Suggest investment allocation clearly.\nUser: ${message}`
              }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("GEMINI ERROR:", error.response?.data || error.message);

    return "AI service temporarily unavailable.";
  }
};