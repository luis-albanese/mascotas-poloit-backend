import HTTP_STATUS from "../utils/httpStatus.js";
import { petService } from "../services/petService.js";
import { createPetSchema } from "../schemas/petSchema.js";

export const petController = () => {
  const { create, getPets } = petService();

  const newPet = async (req, res, next) => {
    const data = req.body;
    // Validamos los datos
    const { error: validationError } = createPetSchema.validate(data);
    // Si existe error, enviamos respuesta al usuario
    if (validationError) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: validationError.details[0].message });
    }
    try {
      const pet = await create(data);
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: "Pet created successfully", pet });
    } catch (error) {
      next(error);
    }
  };
  const getAllPets = async (req, res, next) => {
    try {
      const pets = await getPets();
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "Pets retrieved successfully", pets });
    } catch (error) {
      next(error);
    }
  };
  return { newPet, getAllPets };
};
