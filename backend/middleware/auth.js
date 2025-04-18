// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get the token from headers
  const token = req.header('x-auth-token');

  // Check if there's no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Store the user info in the request
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
