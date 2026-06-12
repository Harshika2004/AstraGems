const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Recommendation = require('../models/Recommendation');

// @route   GET /api/history
// @desc    Get all saved recommendations for the authenticated user
// @access  Private
router.post('/', auth, async (req, res) => {
  // Let's also support POST or GET, but the specs specifically mention GET /api/history. Let's write GET /api/history.
  // Wait, let's put it on router.get('/')
});

router.get('/', auth, async (req, res) => {
  const userId = req.user?.id || req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const history = await Recommendation.find({
      userId: userId,
      isSaved: true
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error('Fetch history error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
