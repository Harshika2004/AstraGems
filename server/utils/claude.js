const { Anthropic } = require('@anthropic-ai/sdk');

// Initialize Anthropic client
const getAnthropicClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('Warning: ANTHROPIC_API_KEY environment variable is missing.');
  }
  return new Anthropic({
    apiKey: apiKey || 'mock_key'
  });
};

/**
 * Extracts and parses JSON array from text response (handles optional Markdown code blocks)
 */
function parseClaudeResponse(text) {
  const cleanText = text.trim();
  try {
    return JSON.parse(cleanText);
  } catch (e) {
    // Try to extract JSON array using regex if Claude wrapped it in markdown code blocks
    const arrayRegex = /\[\s*\{[\s\S]*\}\s*\]/;
    const match = cleanText.match(arrayRegex);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerError) {
        throw new Error('Failed to parse matched JSON block: ' + innerError.message);
      }
    }
    throw new Error('Claude response is not in a valid JSON array format: ' + e.message);
  }
}

/**
 * Calls Claude to recommend gemstones based on user parameters
 */
async function generateRecommendations({ name, birthdate, zodiac, challenges }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  // For development and testing without an API key, return mockup gemstone data
  if (!apiKey || apiKey === 'mock_key') {
    console.log('Using mock gemstone data because ANTHROPIC_API_KEY is not set');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    return [
      {
        name: "Amethyst",
        description: "A beautiful purple quartz crystal known for spiritual elevation and peace.",
        properties: "Promotes calm, clarity, emotional stability, and protects against negative energies. Associated with the Crown Chakra.",
        howToUse: "Wear as a ring on the middle finger of your working hand, set in silver, or keep a cluster in your bedroom.",
        whyForYou: `Since your zodiac is ${zodiac} and you are seeking support with ${challenges.join(', ')}, Amethyst provides mental tranquility and focuses your energies to overcome these obstacles.`
      },
      {
        name: "Yellow Sapphire (Pukhraj)",
        description: "A premier gemstone of wisdom, wealth, and divine grace.",
        properties: "Attracts abundance, enhances decision-making, boosts confidence, and brings good fortune. Associated with Jupiter.",
        howToUse: "Wear set in a gold ring on the index finger of your dominant hand on a Thursday morning.",
        whyForYou: `Yellow Sapphire directly targets your focus on ${challenges.includes('wealth') || challenges.includes('career') ? 'financial growth and career advancement' : 'general prosperity'} matching your ${zodiac} traits.`
      },
      {
        name: "Rose Quartz",
        description: "The stone of universal love and emotional healing.",
        properties: "Opens the heart chakra, restores trust and harmony in relationships, and encourages self-love and compassion.",
        howToUse: "Wear as a pendant close to the heart, or carry a tumbled stone in your left pocket.",
        whyForYou: `To aid you with challenges in ${challenges.includes('love') ? 'love and harmony' : 'personal wellbeing'}, Rose Quartz opens up emotional blocks specific to your ${zodiac} energy profile.`
      }
    ];
  }

  const anthropic = getAnthropicClient();
  const modelName = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
  
  const systemPrompt = `You are an expert gemologist and Vedic astrologer. Based on the user's zodiac sign and life challenges, recommend exactly 3 gemstones. Respond ONLY in this JSON format, no extra text:
[
  {
    "name": "gemstone name",
    "description": "one line description",
    "properties": "metaphysical and healing properties",
    "howToUse": "how to wear or use it",
    "whyForYou": "personalized reason based on their zodiac and challenges"
  }
]`;

  const userPrompt = `User Details:
Name: ${name}
Birthdate: ${birthdate}
Zodiac Sign: ${zodiac}
Life Challenges: ${challenges.join(', ')}

Please provide exactly 3 gemstone recommendations suited for this user.`;

  try {
    const response = await anthropic.messages.create({
      model: modelName,
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    });

    const responseText = response.content[0].text;
    const gemstones = parseClaudeResponse(responseText);

    if (!Array.isArray(gemstones) || gemstones.length !== 3) {
      throw new Error('Recommendation count must be exactly 3');
    }

    return gemstones;
  } catch (error) {
    console.error('Error in Claude recommendation service:', error);
    throw error;
  }
}

module.exports = {
  generateRecommendations
};
