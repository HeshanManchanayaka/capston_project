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
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const audioFileFilter = (req, file, cb) => {
  const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  if (validTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP3, WAV, and OGG audio files are allowed.'));
  }
};

const videoFileFilter = (req, file, cb) => {
  const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (validTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP4, WebM, and OGG video files are allowed.'));
  }
};

const uploadAudio = multer({ storage: audioStorage, fileFilter: audioFileFilter });
const uploadVideo = multer({ storage: videoStorage, fileFilter: videoFileFilter });

// Endpoint to upload audio file
app.post('/upload', uploadAudio.single('audioFile'), (req, res) => {
  const { dayNumber, audioName, description } = req.body;
  const filename = req.file.filename;
  const filePath = req.file.path;

  if (!dayNumber || !audioName || !description) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO audio_management (audio, day, file_path, name, description) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [filename, dayNumber, filePath, audioName, description], (err, result) => {
    if (err) {
      console.error('Error saving data to database:', err);
      return res.status(500).send('Internal server error');
    }
    res.send('Audio file uploaded and data saved to database');
  });
});

// Endpoint to delete audio file
app.post('/delete', (req, res) => {
  const { dayNumber } = req.body;

  if (!dayNumber) {
    return res.status(400).send('Day number is required');
  }

  // First, fetch the filename associated with the dayNumber
  const fetchQuery = 'SELECT audio FROM audio_management WHERE day = ?';
  db.query(fetchQuery, [dayNumber], (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).send('Internal server error');
    }

    if (results.length === 0) {
      return res.status(404).send('Audio file not found');
    }

    const filename = results[0].audio;

    // Delete the entry from the database
    const deleteQuery = 'DELETE FROM audio_management WHERE day = ?';
    db.query(deleteQuery, [dayNumber], (err, result) => {
      if (err) {
        console.error('Error deleting data from database:', err);
        return res.status(500).send('Internal server error');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Audio file not found');
      }

      // Delete the file from the filesystem
      const filePath = path.join(__dirname, 'uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
          return res.status(500).send('Error deleting file from filesystem');
        }

        res.send('Audio file deleted from database and filesystem');
      });
    });
  });
});

// Serve static audio files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to serve audio data from database
app.get('/api/audios', (req, res) => {
  const query = 'SELECT day, name, description, file_path AS url FROM audio_management';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).send('Internal server error');
    }
    // Modify the file path to be a full URL
    const updatedResults = results.map(audio => ({
      ...audio,
      url: `http://localhost:5000/uploads/${path.basename(audio.url)}`
    }));
    res.json(updatedResults);
  });
});

// Endpoint to upload video file
app.post('/upload-video', uploadVideo.single('videoFile'), (req, res) => {
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

// Endpoint to serve video data from database
app.get('/api/videos', (req, res) => {
  const query = 'SELECT name, day, description, author, file_path AS url FROM video_management';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).send('Internal server error');
    }
    // Modify the file path to be a full URL
    const updatedResults = results.map(video => ({
      ...video,
      url: `http://localhost:5000/uploads/${path.basename(video.url)}`
    }));
    res.json(updatedResults);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
