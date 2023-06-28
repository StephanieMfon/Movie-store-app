import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectid = JoiObjectId(Joi);
const addNewMovieValidator = Joi.object({
  genre: Joi.string().optional(),
  isDeleted: Joi.boolean().optional(),
  status: Joi.string().optional(),
  title: Joi.string().required().min(3),
  description: Joi.string().required().min(15),
  movieLength: Joi.string().required(),
  yearReleased: Joi.number().required(),
}).strict();

export { addNewMovieValidator };
