const express = require('express');
const db = require('../db');
const adminRouter = express.Router();

// Route to get all users
adminRouter.get('/all', async (req, res) => {
  try {
    const users = await db.getAllUsers(); // Assuming you have a function to get all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update a user
adminRouter.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { name, date_of_birth, userType } = req.body;
  try {
    await db.updateUser(email, { name, date_of_birth, userType });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a user
adminRouter.delete('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    await db.deleteUser(email);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = adminRouter;
