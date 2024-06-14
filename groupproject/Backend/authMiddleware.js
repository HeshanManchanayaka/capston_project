const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Use the environment variable
const JWT_EXPIRES_IN = '1h'; // or whatever expiry time you need

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.email = decoded.email;
    next();
  });
};

module.exports = authenticate;
