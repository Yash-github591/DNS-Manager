const jwt = require("jsonwebtoken");

// Middleware to verify JWT token for authentication
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    // req.user = null;
    // next();
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = decodedToken;
    next();
  });
}

module.exports = {
  authenticateToken,
};
