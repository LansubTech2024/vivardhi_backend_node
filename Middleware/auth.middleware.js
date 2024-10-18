const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Set the user info to req.user
        req.user = decoded;
        
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;