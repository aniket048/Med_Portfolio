module.exports = (err, req, res, next) => {
  console.log(" i am in err.js");
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  res.status(err.statusCode).json({
    sucess: false,
    message: err.message,
  });
};
