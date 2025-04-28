const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login (bypass validation for testing)
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    // Always succeed for testing
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '7d' });
    res.json({ token, user: { name: 'Test User', email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 