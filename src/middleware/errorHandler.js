/**
 * Error handling middleware
 * Catches all errors and returns appropriate response
 */
const errorHandler = (err, req, res, _next) => {
  console.error("Error:", err);

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors.map((e) => e.message),
    });
  }

  // Handle Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Resource already exists",
    });
  }

  // Handle Sequelize database errors
  if (err.name === "SequelizeDatabaseError") {
    return res.status(500).json({
      message: "Database error occurred",
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({ message });
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.url} not found`,
  });
};

export { errorHandler, notFoundHandler };
