import express from 'express';
import { createConnection } from 'mysql';
import multer, { diskStorage } from 'multer';
import { json, urlencoded } from 'body-parser';
import { join, extname } from 'path';
import { existsSync, mkdirSync, unlink } from 'fs';

const app = express();
const port = 5000;

// Ensure uploads directory exists
const uploadDir = join(__dirname, 'uploads');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}


app.use(json());
app.use(urlencoded({ extended: true }));

// Set up Multer for file uploads
const storage = diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname)); // Save file with timestamp
  }
});

const upload = multer({ storage });

// Endpoint to upload audio file
app.post('/upload', upload.single('audioFile'), (req, res) => {
  const { dayNumber } = req.body;
  const filename = req.file.filename;
  const filePath = req.file.path;

  if (!dayNumber) {
    return res.status(400).send('Day number is required');
  }

  const query = 'INSERT INTO audio_management (audio, day, file_Path) VALUES (?, ?, ?)';
  db.query(query, [filename, dayNumber, filePath], (err, _result) => {
    if (err) throw err;
    res.send('Audio file uploaded and data saved to database');
  });
});

// Endpoint to delete audio file
app.post('/delete', (req, res) => {
  const { filename, dayNumber } = req.body;

  if (!filename || !dayNumber) {
    return res.status(400).send('Filename and day number are required');
  }

  const query = 'DELETE FROM audio_management WHERE audio = ? AND day = ?';
  db.query(query, [filename, dayNumber], (err, result) => {
    if (err) throw err;

    if (result.affectedRows === 0) {
      return res.status(404).send('Audio file not found');
    }

    // Optionally, delete the file from the filesystem
    const filePath = join(__dirname, 'uploads', filename);
    unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });

    res.send('Audio file deleted from database and filesystem');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.get('/audios', (req, res) => {
    const query = 'SELECT * FROM audio_management';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});