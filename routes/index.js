const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);
router.use(auth);
router.use(usersRoutes);
router.use(moviesRoutes);

module.exports = router;
