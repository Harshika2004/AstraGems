const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  // 1. Log the req.body to console so we can see what's arriving
  console.log("Register body:", req.body);

  const { name, email, password } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists FIRST, return 400 if duplicate email
    let existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password with bcrypt BEFORE saving (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user with hashed password
    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token after successful save
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_secret_for_dev',
      { expiresIn: '7d' }
    );

    // Return: token and user object
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Register error:', error.message);
    // Return detailed error message in the catch block
    return res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password using the schema helper
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_secret_for_dev',
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
