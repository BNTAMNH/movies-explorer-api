const moviesRoutes = require('express').Router();
const { createMovie, getMovies } = require('../controllers/movies');
const { createMovieValidator } = require('../middlewares/validation');

moviesRoutes.post('/movies', createMovieValidator, createMovie);
moviesRoutes.get('/movies', getMovies);

module.exports = moviesRoutes;
