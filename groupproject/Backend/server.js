const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json({ limit: '50mb', extended: true })); // Increase the limit to 50mb or as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Increase the limit for URL-encoded data

app.use(cors());
app.use(express.json());


// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'capstone_project' // replace with your database name
});

// Error Handling for DB Connection
db.connect((err) => {
  if (err) {
    console.log(err)
    throw err;
  }
  console.log('MySQL connected...');
});

/* Test route
app.get('/test', (req, res) => {
  res.send("this is test");
});*/

// POST new instructor
app.post('/api/instructors', (req, res) => {
  const { email, name, contactNo, profileImage, role, moreDetails, sdesc } = req.body;

  const sql = 'INSERT INTO instructors (email, name, contactNo, profileImage, role, moreDetails, sdesc) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [email, name, contactNo, profileImage, role, moreDetails, sdesc];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send('Error saving instructor details');
    }
    res.status(201).send('Instructor details saved');
  });
});

// GET data from db (instructor by email)
app.get('/api/instructor/:email', (req, res) => {
  const email = req.params.email;
  const sql = 'SELECT * FROM instructors WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving instructor details');
    }
    if (results.length === 0) {
      return res.status(404).send('Instructor not found');
    }
    res.json(results[0]);
  });
});

// GET all instructors from db
app.get('/api/instructors/', (req, res) => {
  const sql = 'SELECT * FROM instructors';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving instructors');
    }
    if (results.length === 0) {
      return res.status(404).send('No instructors added');
    }
    res.json(results);
  });
});


// Route to add a test instructor
// Route to add a test instructor
app.get('/api/instructors/add-test', (req, res) => {
  const testInstructor = {
    email: 'test@example.com',
    name: 'Test User',
    contactNo: '1234567890',
    profileImage: 'path/to/test/image',
    role: 'Test Role',
    moreDetails: 'This is a test instructor.'
  };

  const sql = 'INSERT INTO instructors (email, name, contactNo, profileImage, role, moreDetails, sdesc) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [testInstructor.email, testInstructor.name, testInstructor.contactNo, testInstructor.profileImage, testInstructor.role, testInstructor.moreDetails, testInstructor.sdesc];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send('Error saving test instructor details');
    }
    res.status(201).send('Test instructor details saved');
  });
});

// Route to update an instructor
app.put('/api/instructors/:email', (req, res) => {
  const email = req.params.email;
  const { name, contactNo, profileImage, role, moreDetails, sdesc } = req.body;

  console.log(`Updating instructor with email: ${email}`);
  console.log(`New details: ${JSON.stringify(req.body)}`);

  const sql = 'UPDATE instructors SET name = ?, contactNo = ?, profileImage = ?, role = ?, moreDetails = ?, sdesc = ? WHERE email = ?';
  const values = [name, contactNo, profileImage, role, moreDetails, sdesc, email];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating instructor details:', err);
      return res.status(500).send('Error updating instructor details');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Instructor not found');
    }
    res.status(200).send('Instructor details updated');
  });
});

// DELETE data from db
app.delete('/api/instructors/:email', (req, res) => {
  const email = req.params.email;
  const sql = 'DELETE FROM instructors WHERE email = ?';
  
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting instructor details');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Instructor not found');
    }
    res.status(200).send('Instructor details deleted');
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

