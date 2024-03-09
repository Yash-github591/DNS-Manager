const jwt = require("jsonwebtoken");

// Middleware to verify JWT token for authentication
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
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
