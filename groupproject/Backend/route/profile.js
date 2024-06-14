const express = require('express');
const authenticate = require('../authMiddleware');
const db = require('../db');

const profileRouter = express.Router();

// Get user profile
profileRouter.get('/:email', authenticate, async (req, res) => {
  const email = req.params.email; // Extract email from URL parameters

  try {
    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
profileRouter.put('/:email', authenticate, async (req, res) => {
  const { name, email } = req.body;
  const userEmail = req.params.email; // Extract email from URL parameters

  try {
    const user = await db.findUserByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = {
      name: name || user.name,
      email: email || user.email,
    };

    await db.updateUser(userEmail, updatedUser); // Update user by email

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user profile
profileRouter.delete('/:email', authenticate, async (req, res) => {
  const email = req.params.email; // Extract email from URL parameters

  try {
    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db.deleteUser(email); // Delete user by email

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = profileRouter;
