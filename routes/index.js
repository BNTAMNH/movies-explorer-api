const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../middlewares/validation');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.use(auth);
router.use(usersRoutes);
router.use(moviesRoutes);

module.exports = router;
