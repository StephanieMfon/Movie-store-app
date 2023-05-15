import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectid = JoiObjectId(Joi);
const addNewMovieValidator = Joi.object({
  movieGenreId: Joi.objectId().optional(),
  movieGenre: Joi.objectId().optional(),
  isDeleted: Joi.boolean().required(),
  status: Joi.string().required(),
  title: Joi.string().required().min(3),
  description: Joi.string().required().min(15),
  movieLength: Joi.string().required(),
  yearReleased: Joi.string().required(),
}).strict();

export { addNewMovieValidator };
