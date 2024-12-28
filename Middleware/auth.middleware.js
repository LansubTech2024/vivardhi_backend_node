// const jwt = require('jsonwebtoken');

// // Authentication Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Token is invalid or expired' });
//     }

//     req.user = user; // Store user info from the token
//     next(); // Proceed to next middleware
//   });
// };

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, 'lansub_2024'); // Replace 'your-secret-key' with your JWT secret
    req.user = decoded; // Attach the decoded user data to req.user
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;

