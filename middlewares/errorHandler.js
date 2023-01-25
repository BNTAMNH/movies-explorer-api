module.exports = function errorHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: err.statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};
