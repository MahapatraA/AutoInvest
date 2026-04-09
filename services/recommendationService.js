const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getRecommendation = async (investment) => {
  const prompt = `
  Fund: ${investment.name}
  Invested: ${investment.amount}
  Current: ${investment.currentValue}
  Returns: ${investment.returns}

  Suggest HOLD / EXIT / BUY MORE with reason.

  Return JSON:
  {
    "action":"",
    "reason":""
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