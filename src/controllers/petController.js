import HTTP_STATUS from "../utils/httpStatus.js";
import { petService } from "../services/petService.js";
import { createPetSchema, updatePetSchema } from "../schemas/petSchema.js";

export const petController = () => {
  const {
    create,
    getPets,
    updateDataPet,
    deleteDataPet,
    getPetByID,
    assingUserToPet,
  } = petService();

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
  const getAllPets = async (_req, res, next) => {
    try {
      const pets = await getPets();
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "Pets retrieved successfully", pets });
    } catch (error) {
      next(error);
    }
  };
  const petByID = async (req, res, next) => {
    const { id } = req.params;
    try {
      const pet = await getPetByID(id);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "Pet retrieved successfully", pet });
    } catch (error) {
      next(error);
    }
  };
  const updatePet = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    // Validamos los datos
    const { error: validationError } = updatePetSchema.validate(data);
    // Si existe error, enviamos respuesta al usuario
    if (validationError) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: validationError.details[0].message });
    }
    try {
      const pet = await updateDataPet(id, data);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "Pet updated successfully", pet });
    } catch (error) {
      next(error);
    }
  };
  const deletePet = async (req, res, next) => {
    const { id } = req.params;
    try {
      const pet = await deleteDataPet(id);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "Pet deleted successfully", pet });
    } catch (error) {
      next(error);
    }
  };
  const adoptPet = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
      const pet = await assingUserToPet(id, userId);
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: "Pet adopted successfully", pet });
    } catch (error) {
      next(error);
    }
  };
  return { newPet, getAllPets, petByID, updatePet, deletePet, adoptPet };
};
