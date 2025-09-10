const errorHandler = (err, req, res, next) => {
  // Log full error in development only
  if (process.env.NODE_ENV !== "production") {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors || err.message,
    });
  }

  // Duplicate Key Error (e.g., email already exists)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate key error",
      errors: err.keyValue,
    });
  }

  // CastError (e.g., invalid MongoDB ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // JWT errors (if using authentication)
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token has expired",
    });
  }

  // Fallback for unexpected errors
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
