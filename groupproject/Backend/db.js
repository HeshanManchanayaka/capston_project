const mysql = require('mysql');

// Create a MySQL connection pool
const db = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root',      // Replace with your MySQL username
    password: '',      // Replace with your MySQL password
    database: 'capstone_project' // Replace with your MySQL database name
});

// Log a message to indicate database connection synchronization
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Database connected successfully');
});

module.exports = db;
