const jwt = require("jsonwebtoken");


// =========================
// VERIFY TOKEN
// =========================

const verifyToken = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Expected format:
    // Authorization: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    // JWT secret
    const secretKey =
      process.env.JWT_SECRET || "primeway_secret_key";

    // Verify token
    const decoded = jwt.verify(
      token,
      secretKey
    );

    // Save user information
    req.user = decoded;

    // Continue
    next();

  } catch (error) {
    console.error(
      "Token verification error:",
      error
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


// =========================
// OPTIONAL AUTHENTICATION
// =========================

const optionalAuth = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // No token = guest user
    if (!authHeader) {
      req.user = null;
      return next();
    }

    // Get token
    const token = authHeader.split(" ")[1];

    // No token = guest user
    if (!token) {
      req.user = null;
      return next();
    }

    // JWT secret
    const secretKey =
      process.env.JWT_SECRET || "primeway_secret_key";

    // Verify token
    const decoded = jwt.verify(
      token,
      secretKey
    );

    // Logged-in user
    req.user = decoded;

    // Continue
    next();

  } catch (error) {
    // Invalid or expired token
    // Treat the visitor as a guest
    req.user = null;

    next();
  }
};


// =========================
// EXPORT
// =========================

module.exports = {
  verifyToken,
  optionalAuth,
};