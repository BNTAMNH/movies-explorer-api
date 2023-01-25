const moviesRoutes = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, movieIdValidator } = require('../middlewares/validation');

moviesRoutes.post('/movies', createMovieValidator, createMovie);
moviesRoutes.get('/movies', getMovies);
moviesRoutes.delete('/movies/:movieId', movieIdValidator, deleteMovie);

module.exports = moviesRoutes;
