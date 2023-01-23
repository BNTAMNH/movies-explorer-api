const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { jwtDev } = require('../utils/config');

const User = require('../models/user');

const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const {
  incorrectEmailOrPassword,
  emailConflict,
  badRequest,
  notFoundUser,
} = require('../utils/errorMessages');

module.exports.createUser = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.send({ name, email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailConflict));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequest));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : jwtDev, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === 'IncorrectEmail') {
        next(new AuthError(incorrectEmailOrPassword));
      }
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundUser);
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(notFoundUser))
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(badRequest));
      } else {
        next(err);
      }
    });
};
