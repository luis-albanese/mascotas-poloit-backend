import Joi from "joi";

export const createPet = Joi.object({
  name: Joi.string().required(),
  race: Joi.string().required(),
  color: Joi.string().required(),
  age: Joi.number().required(),
  size: Joi.string().validate("SMALL", "MEDIUM", "BIG").required(),
  image: Joi.string().required(),
  userId: Joi.number().required(),
  status: Joi.string().validate("ACTIVE", "INACTIVE"),
});
