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

// Route to fetch all video entries
app.get('/api/videos', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM video_data';
    const [rows] = await connection.query(sql);
    await connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching video data' });
  }
});

// Route to add a new video entry
app.post('/api/videos', async (req, res) => {
  const { dayId, videoUrl } = req.body; // Assuming you store a URL to the video

  try {
    const connection = await pool.getConnection();
    const sql = `INSERT INTO video_data (dayId, videoUrl) VALUES (?, ?)`;
    const [result] = await connection.query(sql, [dayId, videoUrl]);
    await connection.release();
    res.json({ message: 'Video added successfully!', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding video' });
  }
});

// Route to update an existing video entry
app.put('/api/videos/:id', async (req, res) => {
  const { id } = req.params;
  const { dayId, videoUrl } = req.body; // Assuming you store a URL to the video

  try {
    const connection = await pool.getConnection();
    const sql = `UPDATE video_data SET dayId = ?, videoUrl = ? WHERE id = ?`;
    const [result] = await connection.query(sql, [dayId, videoUrl, id]);
    await connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating video' });
  }
});

// Route to delete a video entry
app.delete('/api/videos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM video_data WHERE id = ?`;
    const [result] = await connection.query(sql, [id]);
    await connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting video' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
