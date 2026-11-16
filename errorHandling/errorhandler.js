export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  let error = "Internal Server Error";

  if (statusCode === 404) {
    error = "Not Found";
  } else if (statusCode === 400) {
    error = "Bad Request";
  }

  console.error(err);

  const message = statusCode === 500 ? "Something went wrong" : err.message || "Something went wrong";

  return res.status(statusCode).json({
    message,
    error,
    statusCode,
  });
};
