const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500;

  // duplicate email used in MongoDB
  if (err.code == "11000") {
    err.message = "Duplicate database request failed";
  }

  res.status(statusCode).json({
    message: err.message,
    errorCode: err.code,
    stack: process.env.NODE_ENV === "DEV" ? err.stack : null,
  });
};

module.exports = {
  errorHandler,
};
