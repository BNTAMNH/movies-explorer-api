const usersRoutes = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validation');

usersRoutes.get('/users/me', getUserInfo);
usersRoutes.patch('/users/me', updateUserValidator, updateUserInfo);

module.exports = usersRoutes;
