const { serverError } = require('../utils/responseMessages');

module.exports = function errorHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: err.statusCode === 500 ? serverError : message });
  next();
};
