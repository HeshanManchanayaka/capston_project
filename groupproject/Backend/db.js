const mysql = require('mysql');
const bcrypt = require('bcryptjs');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'capstone_project'
});

// Connect to the database (optional: if you want to test connection on startup)
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  if (connection) connection.release();
  console.log('Database connected successfully');
});

// Add a new user to the database
const addUser = async (name, email, password, date_of_birth) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { name, email, password: hashedPassword, date_of_birth };
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO user SET ?', user, (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Find a user by their email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error finding user by email:', err);
        return reject(err);
      }
      if (results.length === 0) {
        resolve(null); // No user found
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Find a user by their ID
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error finding user by ID:', err);
        return reject(err);
      }
      if (results.length === 0) {
        resolve(null); // No user found
      } else {
        resolve(results[0]);
      }
    });
  });
};

module.exports = {
  addUser,
  findUserByEmail,
  findUserById,
};
