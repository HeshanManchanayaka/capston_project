const express = require('express');
const db = require('../db');
const adminRouter = express.Router();

// Fetch all users
adminRouter.get('/users', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user by email
adminRouter.put('/users/:email', async (req, res) => {
  const { email } = req.params;
  const userUpdates = req.body;

  try {
    const result = await db.updateUser(email, userUpdates);
    res.json(result);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user by email
adminRouter.delete('/users/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await db.deleteUser(email);
    res.json(result);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = adminRouter;
