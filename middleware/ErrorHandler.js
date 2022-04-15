module.exports = (err, req, res, next) => {
  return res.status(err.statusCode).json({
    success: false,
    code: err.name,
    message: err.message
  });
}