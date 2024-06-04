const express = require('express');
const db = require('../db');

const registerRouter = express.Router();

registerRouter.post('/register', (req, res) => {
  const { name, email, password, date_of_birth } = req.body;
  console.log(name);
  // Validate input
  if (!name || !email || !password || !date_of_birth) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the user already exists
  const checkUserSql = 'SELECT * FROM user WHERE email = ?';
  db.query(checkUserSql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Insert the new user into the database
    const insertUserSql = 'INSERT INTO user (name, email, password, date_of_birth) VALUES (?, ?, ?, ?)';
    db.query(insertUserSql, [name, email, password, date_of_birth], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

module.exports = registerRouter;
