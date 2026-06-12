const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Recommendation = require('../models/Recommendation');
const { generateRecommendations } = require('../utils/claude');

// @route   POST /api/recommend
// @desc    Generate gemstone recommendations and save as unsaved/draft
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, birthdate, zodiac, challenges } = req.body;

  // Validation
  if (!name || !birthdate || !zodiac || !challenges) {
    return res.status(400).json({ message: 'Please provide name, birthdate, zodiac, and challenges' });
  }

  if (!Array.isArray(challenges) || challenges.length === 0) {
    return res.status(400).json({ message: 'At least one life challenge is required' });
  }

  // Access user id as: req.user.id OR req.user._id — log both to console to see which one exists:
  console.log("req.user:", req.user);

  // Use optional chaining to be safe:
  const userId = req.user?.id || req.user?._id;

  // If userId is undefined return 401 immediately:
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Generate gemstone suggestions using Claude API
    let gemstones;
    try {
      gemstones = await generateRecommendations({
        name,
        birthdate,
        zodiac,
        challenges
      });

      // After Claude API returns the gemstone JSON, validate it before accessing properties
      if (!Array.isArray(gemstones) || gemstones.length === 0) {
        throw new Error('Gemstone recommendation output is empty or not an array');
      }

      // Ensure each gemstone object has the required keys and default to safe placeholders if missing
      gemstones = gemstones.map(gem => ({
        name: gem?.name || 'Vedic Crystal',
        description: gem?.description || 'A celestial gemstone that aligns with your astral field.',
        properties: gem?.properties || 'Associated with spiritual balance and clarity.',
        howToUse: gem?.howToUse || 'Wear close to the skin or place in a clean space.',
        whyForYou: gem?.whyForYou || `Resonates with your astral sign and helps resolve challenges.`
      }));
    } catch (apiErr) {
      console.error('Claude API gemstone generation/validation failed, using fallback:', apiErr.message);
      // Fallback gemstones
      gemstones = [
        {
          name: "Amethyst",
          description: "A beautiful purple quartz crystal known for spiritual elevation and peace.",
          properties: "Promotes calm, clarity, emotional stability, and protects against negative energies. Associated with the Crown Chakra.",
          howToUse: "Wear as a ring on the middle finger of your working hand, set in silver.",
          whyForYou: `Since your zodiac is ${zodiac} and you are seeking support with ${challenges.join(', ')}, Amethyst provides mental tranquility and focuses your energies to help navigate these challenges.`
        },
        {
          name: "Yellow Sapphire",
          description: "A premier gemstone of wisdom, wealth, and divine grace.",
          properties: "Attracts abundance, enhances decision-making, boosts confidence, and brings good fortune.",
          howToUse: "Wear set in a gold ring on the index finger of your dominant hand on a Thursday morning.",
          whyForYou: `Yellow Sapphire directly targets your focus on ${challenges.includes('wealth') || challenges.includes('career') ? 'financial growth and career advancement' : 'general prosperity'} matching your ${zodiac} traits.`
        },
        {
          name: "Rose Quartz",
          description: "The stone of universal love and emotional healing.",
          properties: "Opens the heart chakra, restores trust and harmony in relationships, and encourages self-love.",
          howToUse: "Wear as a pendant close to the heart, or carry a tumbled stone.",
          whyForYou: `To aid you with challenges in ${challenges.join(', ')}, Rose Quartz opens up emotional blocks to restore peace and harmony.`
        }
      ];
    }

    // Save to database (initially isSaved is false)
    const newRecommendation = new Recommendation({
      userId: userId,
      name,
      birthdate,
      zodiac,
      challenges,
      gemstones,
      isSaved: false
    });

    const recommendation = await newRecommendation.save();
    res.status(201).json(recommendation);
  } catch (err) {
    console.error('Recommendation route error:', err.message);
    res.status(500).json({ message: 'Server error generating recommendation: ' + err.message });
  }
});

// @route   PUT /api/recommend/:id/save
// @desc    Mark a recommendation as saved
// @access  Private
router.put('/:id/save', auth, async (req, res) => {
  try {
    let recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    // Safely extract userId using optional chaining:
    const userId = req.user?.id || req.user?._id;

    // Check if the recommendation belongs to the user
    if (recommendation.userId.toString() !== userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    recommendation.isSaved = true;
    await recommendation.save();

    res.json({ message: 'Recommendation saved to history successfully', recommendation });
  } catch (err) {
    console.error('Save recommendation error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Recommendation not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
