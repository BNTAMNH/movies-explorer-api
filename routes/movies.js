const moviesRoutes = require('express').Router();
const { createMovie } = require('../controllers/movies');
const { createMovieValidator } = require('../middlewares/validation');

moviesRoutes.post('/movies', createMovieValidator, createMovie);

module.exports = moviesRoutes;
