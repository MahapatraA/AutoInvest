const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getAdvice = async (message, user) => {
  const prompt = `
  User Risk: ${user.riskProfile}
  Monthly Investment: ${user.monthlyInvestment}

  Message: ${message}

  Suggest 3 investment options with allocation.
  Return JSON:
  {
    "options":[
      {"name":"","risk":"","allocation":0}
    ],
    "explanation":""
  }
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  });

  const content = response.choices[0].message.content;

  try {
  return JSON.parse(content);
} catch (err) {
  return {
    error: "Invalid AI response",
    raw: content
  };
}
};