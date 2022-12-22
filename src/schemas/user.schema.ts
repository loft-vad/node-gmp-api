import Joi from "joi";

export const userSchema = Joi.object().keys({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
});
