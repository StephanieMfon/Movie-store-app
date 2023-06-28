import Joi from "joi";
// make sure the password to add a new user does what its supposed to do
export const createUserValidator = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Please input a valid email adress",
      "string.empty": "Email cannot be empty",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),

  // repeatPassword: Joi.valid(userData.password).messages({
  //   "any.only": "The two passwords do not match",
  //   "any.required": "Please re-enter the password",
  // }),
});

export const loginUserValidator = Joi.object({
  username: Joi.string().optional(),
  password: Joi.string().required(),
  email: Joi.string().optional(),
});
