const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'capstone_project'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Endpoint to upload video file
app.post('/upload-video', upload.single('videoFile'), (req, res) => {
  const { videoName, day, description, author } = req.body;
  const filename = req.file.filename;
  const filePath = req.file.path;

  if (!videoName || !day || !description || !author) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO video_management (video, name, day, description, author, file_path) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [filename, videoName, day, description, author, filePath], (err, result) => {
    if (err) {
      console.error('Error saving data to database:', err);
      return res.status(500).send('Internal server error');
    }
    res.send('Video file uploaded and data saved to database');
  });
});

// Endpoint to delete video file
app.post('/delete-video', (req, res) => {
  const { videoName, day } = req.body;

  if (!videoName || !day) {
    return res.status(400).send('Video name and day are required');
  }

  const fetchQuery = 'SELECT video FROM video_management WHERE name = ? AND day = ?';
  db.query(fetchQuery, [videoName, day], (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).send('Internal server error');
    }

    if (results.length === 0) {
      return res.status(404).send('Video file not found');
    }

    const filename = results[0].video;

    const deleteQuery = 'DELETE FROM video_management WHERE name = ? AND day = ?';
    db.query(deleteQuery, [videoName, day], (err, result) => {
      if (err) {
        console.error('Error deleting data from database:', err);
        return res.status(500).send('Internal server error');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Video file not found');
      }

      const filePath = path.join(__dirname, 'uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
          return res.status(500).send('Error deleting file from filesystem');
        }

        res.send('Video file deleted from database and filesystem');
      });
    });
  });
});

// Serve static video files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
