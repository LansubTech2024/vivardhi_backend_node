const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("Headers received:", req.headers); // Debugging

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ error: "Token expired. Please log in again." });
      }
      return res.status(403).json({ error: "Token is invalid." });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
