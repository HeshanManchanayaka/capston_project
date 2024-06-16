const mysql = require('mysql');

// Create a MySQL connection pool
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',  
    password: '',      
    database: 'capstone_project' 
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
