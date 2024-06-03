const express = require('express');
const db = require('../db');

const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if the user exists
  const checkUserSql = 'SELECT * FROM user WHERE email = ? AND password = ?';
  db.query(checkUserSql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }
    // User found, you can generate a JWT token or set session here
    res.status(200).json({ message: 'Login successful' });
  });
});

module.exports = loginRouter;
