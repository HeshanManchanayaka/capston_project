const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
  const { name, email, password, date_of_birth } = req.body;

  try { 
    if (!name || !email || !password || !date_of_birth) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    console.log('Password received:', password); // Log received password

    const hashedPassword = bcrypt.hashSync(password, 10); // Hash password

    console.log('Hashed password:', hashedPassword); // Log hashed password

    // Determine user type based on email
    let userType = 'user'; // Default user type
    if (email.endsWith('@admin.com')) {
      userType = 'admin';
    } else if (email.endsWith('@instructor.com')) {
      userType = 'instructor';
    }

    await db.addUser({ name, email, password: hashedPassword, date_of_birth, userType });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = registerRouter;
