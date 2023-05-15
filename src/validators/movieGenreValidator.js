import Joi from "joi";

export const movieGenreValidator = Joi.object({
  genreName: Joi.string().required,
  genreDescription: Joi.string().min(4).required,
}).strict();
