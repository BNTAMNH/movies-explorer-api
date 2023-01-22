const usersRoutes = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

usersRoutes.get('/users/me', getUserInfo);
usersRoutes.patch('/users/me', updateUserInfo);

module.exports = usersRoutes;
