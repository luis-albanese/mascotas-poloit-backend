import { petModel } from "../models/petModel";

export const petService = () => {
  const { createPet, getAllPets } = petModel();
  const create = async (data) => {
    try {
      const res = await createPet(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const getPets = async () => {
    try {
      const pets = await getAllPets();
      return pets;
    } catch (error) {
      return error;
    }
  };
  return {
    create,
  };
};
