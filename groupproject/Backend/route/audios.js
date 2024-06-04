const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Replace with your MySQL connection details
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Route to fetch all audio entries
app.get('/api/audios', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM audio_data';
    const [rows] = await connection.query(sql);
    await connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching audio data' });
  }
});

// Route to add a new audio entry
app.post('/api/audios', async (req, res) => {
  const { dayId } = req.body;

  // Assuming you have additional audio data fields (e.g., filename, data)
  // const { dayId, filename, data } = req.body;

  try {
    const connection = await pool.getConnection();
    const sql = `INSERT INTO audio_data (dayId) VALUES (?)`;
    const [result] = await connection.query(sql, [dayId]);
    await connection.release();
    res.json({ message: 'Audio added successfully!', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding audio' });
  }
});

// Route to update an existing audio entry
app.put('/api/audios/:id', async (req, res) => {
  const { id } = req.params;
  const { dayId } = req.body;

  // Assuming you have additional audio data fields to update
  // const { dayId, filename, data } = req.body;

  try {
    const connection = await pool.getConnection();
    const sql = `UPDATE audio_data SET dayId = ? WHERE id = ?`;
    const [result] = await connection.query(sql, [dayId, id]);
    await connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Audio not found' });
    }
    res.json({ message: 'Audio updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating audio' });
  }
});

// Route to delete an audio entry
app.delete('/api/audios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM audio_data WHERE id = ?`;
    const [result] = await connection.query(sql, [id]);
    await connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Audio not found' });
    }
    res.json({ message: 'Audio deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting audio' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
