const moviesRoutes = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { createMovieValidator } = require('../middlewares/validation');

moviesRoutes.post('/movies', createMovieValidator, createMovie);
moviesRoutes.get('/movies', getMovies);
moviesRoutes.delete('/movies/:movieId', deleteMovie);

module.exports = moviesRoutes;
