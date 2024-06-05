const express = require('express');
const db = require('../db');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
  const { name, email, password, date_of_birth } = req.body;

  try {
    // Validate input
    if (!name || !email || !password || !date_of_birth) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const user = await db.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Insert the new user into the database
    await db.addUser(email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = registerRouter;
