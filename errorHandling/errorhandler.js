export default (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  // PostgreSQL: Ugyldigt ID eller datatype
  if (err.code === "22P02") {
    statusCode = 400;
  }

  // PostgreSQL: Foreign key findes ikke
  if (err.code === "23503") {
    statusCode = 400;
  }

  // PostgreSQL: CHECK constraint fejler
  if (err.code === "23514") {
    statusCode = 400;
  }

  // PostgreSQL: NOT NULL constraint fejler
  if (err.code === "23502") {
    statusCode = 400;
  }

  // PostgreSQL: Duplicate/unique constraint
  if (err.code === "23505") {
    statusCode = 409;
  }

  // PostgreSQL: Ugyldig dato
  if (err.code === "22007" || err.code === "22008") {
    statusCode = 400;
  }

  let error = "Internal Server Error";

  if (statusCode === 404) {
    error = "Not Found";
  } else if (statusCode === 400) {
    error = "Bad Request";
  } else if (statusCode === 409) {
    error = "Conflict";
  }

  // Log fejlen i terminalen
  console.error(err);

  const message = statusCode === 500 ? "Something went wrong" : err.statusCode ? err.message : statusCode === 409 ? "Resource already exists" : "Invalid database data or reference";

  return res.status(statusCode).json({
    message,
    error,
    statusCode,
  });
};
