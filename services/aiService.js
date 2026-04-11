const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const parseTotalAmount = (message) => {
  const normalized = message.replace(/,/g, "");

  const inrMatch = normalized.match(/(?:₹|rs\.?|inr)\s*(\d+(?:\.\d+)?)/i);
  if (inrMatch) {
    return Number(inrMatch[1]);
  }

  const haveMatch = normalized.match(/(?:i\s+have|i\s+got|total|amount)\s*(\d+(?:\.\d+)?)/i);
  if (haveMatch) {
    return Number(haveMatch[1]);
  }

  return null;
};

const normalizeName = (rawName, index) => {
  if (!rawName) {
    return `Option ${index + 1}`;
  }

  const cleaned = rawName
    .replace(/^[\s,:-]+|[\s,:-]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return `Option ${index + 1}`;
  }

  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const parseExplicitPercentAllocations = (message) => {
  const allocations = [];
  const regex = /(\d+(?:\.\d+)?)\s*%\s*(?:on|in|for)?\s*([a-zA-Z ]{2,40})/g;
  let match;

  while ((match = regex.exec(message)) !== null) {
    const percent = Number(match[1]);
    if (!Number.isFinite(percent) || percent <= 0) {
      continue;
    }

    allocations.push({
      name: normalizeName(match[2], allocations.length),
      allocation: percent
    });
  }

  return allocations;
};

const isGenericBucketName = (name = "") => /\b(other|others|remaining|rest|best investment|suggest|apart from)\b/i.test(name);

const shouldAskLLMForBreakdown = (allocations = []) =>
  allocations.some((option) => isGenericBucketName(option?.name));

const enrichAllocations = (options, totalAmount) => {
  if (!Array.isArray(options) || !options.length) {
    return [];
  }

  const normalizedOptions = options.map((option, index) => {
    const name = normalizeName(option?.name, index);
    const rawAllocation = Number(option?.allocation);
    const rawAmount = Number(option?.amount);

    return {
      name,
      allocation: Number.isFinite(rawAllocation) ? rawAllocation : 0,
      amount: Number.isFinite(rawAmount) ? rawAmount : null
    };
  });

  const totalAllocation = normalizedOptions.reduce((sum, option) => sum + option.allocation, 0);
  const looksLikeAmounts = totalAmount && totalAllocation > 100.5 && totalAllocation <= totalAmount * 1.2;

  const withPercent = normalizedOptions.map((option) => {
    if (looksLikeAmounts && totalAmount) {
      const amount = option.allocation;
      return {
        ...option,
        amount,
        allocation: Number(((amount / totalAmount) * 100).toFixed(2))
      };
    }

    if (option.amount === null && totalAmount) {
      return {
        ...option,
        amount: Number(((option.allocation / 100) * totalAmount).toFixed(2))
      };
    }

    return option;
  });

  return withPercent.map((option) => ({
    name: option.name,
    allocation: Number(option.allocation.toFixed(2)), // Keep this in percentage for UI compatibility
    amount: option.amount === null ? null : Number(option.amount.toFixed(2)),
    displayAmount: option.amount === null ? null : `₹${Math.round(option.amount)}`
  }));
};

const buildPrompt = (message, totalAmount) => `
User: ${message}
${totalAmount ? `Total investment amount detected: ₹${totalAmount}` : ""}

Suggest investment allocation.

Rules:
1) allocation MUST be a percentage number between 0 and 100.
2) If total amount is available, include amount in rupees.
3) Keep options practical and concise.
4) Output ONLY valid JSON.

Return ONLY JSON:
{
  "options": [
    { "name": "", "allocation": number, "amount": number | null }
  ]
}
`;

const buildBreakdownPrompt = (message, totalAmount, explicitAllocations) => {
  const fixedAllocations = explicitAllocations.filter((option) => !isGenericBucketName(option.name));
  const fixedPercent = fixedAllocations.reduce((sum, option) => sum + option.allocation, 0);
  const remainingPercent = Math.max(0, Number((100 - fixedPercent).toFixed(2)));

  return `
User: ${message}
${totalAmount ? `Total investment amount: ₹${totalAmount}` : ""}

Known fixed allocation from user:
${fixedAllocations.length ? JSON.stringify(fixedAllocations) : "[]"}

Task:
1) Keep all fixed allocations exactly as provided.
2) Replace generic buckets like "other best investment" with concrete options (ETF, index funds, real estate, debt, etc.) based on suitability.
3) New options must add up to the remaining ${remainingPercent}% exactly (allow rounding ±0.5%).
4) Exclude duplicate generic labels like "Other Best Investment".
5) allocation MUST stay as percentage numbers.
6) If total amount is available, include amount in rupees.
7) Output ONLY valid JSON.

Return ONLY JSON:
{
  "options": [
    { "name": "", "allocation": number, "amount": number | null }
  ]
}
`;
};

const askGroq = async (prompt) => {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a financial advisor. Always return JSON only."
        },
        {
          role: "user",
          content: prompt
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

  return response.data.choices[0].message.content;
};

exports.getAIResponse = async (message) => {
  const totalAmount = parseTotalAmount(message);
  const explicitPercentAllocations = parseExplicitPercentAllocations(message);

  if (explicitPercentAllocations.length && !shouldAskLLMForBreakdown(explicitPercentAllocations)) {
    return {
      options: enrichAllocations(explicitPercentAllocations, totalAmount)
    };
  }

  try {
    const prompt = shouldAskLLMForBreakdown(explicitPercentAllocations)
      ? buildBreakdownPrompt(message, totalAmount, explicitPercentAllocations)
      : buildPrompt(message, totalAmount);

    const text = await askGroq(prompt);

    try {
      const parsed = JSON.parse(text);
      return {
        options: enrichAllocations(parsed.options, totalAmount)
      };
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
