const jwt = require("jsonwebtoken");
const { logout } = require("./joiVaildation");

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      const err = new Error("Authorization header is missing");
      err.status = 404;
      throw err;
    }

    const { error } = logout({ authorization: req.headers.authorization });
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      throw err;
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.message = "Token expired. Please log in again.";
      error.status = 401;
    } else if (error.name === "JsonWebTokenError") {
      error.message = "Invalid token. Access denied.";
      error.status = 401;
    }
    next(error);
  }
};

module.exports = verifyToken;
