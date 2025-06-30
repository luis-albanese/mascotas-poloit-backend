import { petModel } from "../models/petModel.js";

export const petService = () => {
  const { createPet, getAllPets, petByID, updatePet, deletePet, adoptPet } =
    petModel();

  const create = async (data) => {
    try {
      return await createPet({
        ...data,
        status: data.status || "ACTIVE",
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

  const getPetByID = async (id) => {
    try {
      return await petByID(id);
    } catch (error) {
      throw error;
    }
  };

  const updateDataPet = async (id, data) => {
    try {
      return await updatePet(id, data);
    } catch (error) {
      throw error;
    }
  };

  const deleteDataPet = async (id) => {
    try {
      return await deletePet(id);
    } catch (error) {
      throw error;
    }
  };
  const assingUserToPet = async (id, userId) => {
    try {
      return await adoptPet(id, userId);
    } catch (error) {
      throw error;
    }
  };

  return {
    create,
    getPets,
    getPetByID,
    updateDataPet,
    deleteDataPet,
    assingUserToPet,
  };
};
