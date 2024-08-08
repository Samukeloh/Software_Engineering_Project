const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

// Registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

// Logout
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out' });
});

module.exports = router;
