const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    // The middleware must extract the token from the Authorization header:
    const token = req.headers.authorization?.split(" ")[1];

    // If no token: return res.status(401).json({ message: "No token provided" })
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token:
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev');

    // Set req.user = decoded (which contains the user id)
    req.user = decoded;
    next();
  } catch (err) {
    // If verification fails return: res.status(401).json({ message: "Invalid token" })
    return res.status(401).json({ message: "Invalid token" });
  }
};
