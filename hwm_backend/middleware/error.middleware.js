module.exports = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
};
