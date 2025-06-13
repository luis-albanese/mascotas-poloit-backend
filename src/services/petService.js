import { petModel } from "../models/petModel";

export const petService = () => {
  const { createPet } = petModel();
  const create = async (data) => {
    try {
      const res = await createPet(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  return {
    create,
  };
};
