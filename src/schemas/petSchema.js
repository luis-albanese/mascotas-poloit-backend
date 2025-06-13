import Joi from "joi";

export const createPetSchema = Joi.object({
  name: Joi.string().required(),
  race: Joi.string().required(),
  color: Joi.string().required(),
  age: Joi.number().required(),
  size: Joi.string().valid("SMALL", "MEDIUM", "BIG").required(), // Cambia validate por valid
  image: Joi.string().required(),
  userId: Joi.number().required(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE") // Añade default
});