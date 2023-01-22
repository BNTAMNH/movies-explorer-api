const { celebrate, Joi } = require('celebrate');

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(/https?:\/\/\S+/),
    trailerLink: Joi.string().regex(/https?:\/\/\S+/),
    thumbnail: Joi.string().regex(/https?:\/\/\S+/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
