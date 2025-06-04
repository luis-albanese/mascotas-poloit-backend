import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  rol: Joi.string().valid("ADMIN", "USER").required(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  rol: Joi.string().valid("ADMIN", "USER"),
  status: Joi.string().valid("ACTIVE", "INACTIVE"),
});
