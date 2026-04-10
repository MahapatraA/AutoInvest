const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

exports.getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192", // 🔥 best free model
        messages: [
          {
            role: "system",
            content: "You are a financial advisor. Always return JSON only."
          },
          {
            role: "user",
            content: `
User: ${message}

Suggest investment allocation.

Return ONLY JSON:
{
  "options": [
    { "name": "", "allocation": number }
  ]
}
            `
          }
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

    // 🔥 parse JSON safely
    try {
      return JSON.parse(text);
    } catch {
      return {
        error: "Invalid JSON from AI",
        raw: text
      };
    }

  } catch (error) {
    console.error("GROQ ERROR:", error.response?.data || error.message);

    return {
      error: "AI service failed",
      raw: error.response?.data || error.message
    };
  }
};