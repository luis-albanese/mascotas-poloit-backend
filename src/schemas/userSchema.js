import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().required(),
  rol: Joi.string().valid("ADMIN", "USER").optional().default("USER"),
  status: Joi.string().valid("ACTIVE", "INACTIVE").optional().default("ACTIVE"),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  rol: Joi.string().valid("ADMIN", "USER").optional().default("USER"),
  status: Joi.string().valid("ACTIVE", "INACTIVE").optional().default("ACTIVE"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
