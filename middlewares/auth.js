const jwt = require('jsonwebtoken');
const { jwtDev } = require('../utils/config');
const AuthError = require('../errors/AuthError');
const { needAuthorization } = require('../utils/responseMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = function Auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(needAuthorization);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtDev);
  } catch (err) {
    throw new AuthError(needAuthorization);
  }

  req.user = payload;
  next();
};
