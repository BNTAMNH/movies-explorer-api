const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const usersRoutes = require('./users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);
router.use(auth);
router.use(usersRoutes);

module.exports = router;
