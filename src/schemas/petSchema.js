import Joi from "joi";

export const createPetSchema = Joi.object({
  name: Joi.string().required(),
  race: Joi.string().required(),
  color: Joi.string().required(),
  age: Joi.number().required(),
  size: Joi.string().valid("SMALL", "MEDIUM", "BIG").required(),
  image: Joi.string().required(),
  userId: Joi.number().required(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE"),
});

export const updatePetSchema = Joi.object({
  name: Joi.string(),
  race: Joi.string(),
  color: Joi.string(),
  age: Joi.number(),
  size: Joi.string().valid("SMALL", "MEDIUM", "BIG"),
  image: Joi.string(),
  status: Joi.string().valid("ACTIVE", "INACTIVE"),
});
