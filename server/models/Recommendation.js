const mongoose = require('mongoose');

const GemstoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  properties: {
    type: String,
    required: true
  },
  howToUse: {
    type: String,
    required: true
  },
  whyForYou: {
    type: String,
    required: true
  }
});

const RecommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Astrology name is required'],
    trim: true
  },
  birthdate: {
    type: Date,
    required: [true, 'Birthdate is required']
  },
  zodiac: {
    type: String,
    required: [true, 'Zodiac sign is required']
  },
  challenges: {
    type: [String],
    required: [true, 'At least one life challenge is required'],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'You must select at least one challenge'
    }
  },
  gemstones: {
    type: [GemstoneSchema],
    required: true,
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length === 3;
      },
      message: 'Recommendation must contain exactly 3 gemstones'
    }
  },
  isSaved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
