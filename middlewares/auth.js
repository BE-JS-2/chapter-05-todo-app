var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        message: "Unauthorized request",
      });
    } else {
      const decoded = jwt.verify(token, "key");
      req.user = decoded;
      next();
    }
  } catch (error) {
    next({ status: 401, message: "Unauthorized request" });
  }
};

module.exports = auth;
