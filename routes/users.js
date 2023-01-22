const usersRoutes = require('express').Router();
const { getUserInfo } = require('../controllers/users');

usersRoutes.get('/users/me', getUserInfo);

module.exports = usersRoutes;
