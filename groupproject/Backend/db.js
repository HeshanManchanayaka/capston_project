const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'capstone_project'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  if (connection) connection.release();
  console.log('Database connected successfully');
});

const addUser = (user) => {
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

const updateUser = (email, user) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE user SET ? WHERE email = ?', [user, email], (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const deleteUser = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM user WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error deleting user:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error finding user by email:', err);
        return reject(err);
      }
      if (results.length === 0) {
        resolve(null); 
      } else {
        resolve(results[0]);
      }
    });
  });
};

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error finding user by ID:', err);
        return reject(err);
      }
      if (results.length === 0) {
        resolve(null); 
      } else {
        resolve(results[0]);
      }
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM user', (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  addUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
