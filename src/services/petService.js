import { petModel } from "../models/petModel.js"; // Añade .js

export const petService = () => {
  const { createPet, getAllPets } = petModel();
  
  const create = async (data) => {
    try {
      return await createPet({
        ...data,
        status: data.status || "ACTIVE" // Asegura valor por defecto
      });
    } catch (error) {
      throw error;
    }
  };

  const getPets = async () => {
    try {
      return await getAllPets();
    } catch (error) {
      throw error;
    }
  };

  return { create, getPets }; // Añade getPets al return
};