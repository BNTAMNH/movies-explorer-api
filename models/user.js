const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const AuthError = require('../errors/AuthError');
const { incorrectEmailOrPassword } = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function login(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(incorrectEmailOrPassword));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(incorrectEmailOrPassword));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
