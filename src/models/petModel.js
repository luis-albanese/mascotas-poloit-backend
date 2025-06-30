import { prisma } from "../config/prisma.js";

export const petModel = () => {
  const createPet = async (data) => {
    try {
      const pet = await prisma.pet.create({ data });
      return pet;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getAllPets = async () => {
    try {
      const pets = await prisma.pet.findMany({
        include: {
          user: true,
        },
      });
      return pets;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const petByID = async (id) => {
    try {
      const pet = await prisma.pet.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true,
        },
      });
      return pet;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updatePet = async (id, data) => {
    const idNumber = parseInt(id);
    try {
      const petFound = await prisma.pet.findUnique({
        where: { id: idNumber },
        include: {
          user: true,
        },
      });

      if (!petFound) {
        throw new Error("Mascota no encontrada");
      }

      const { id: _, ...safeData } = data;

      const pet = await prisma.pet.update({
        where: { id: idNumber },
        data: safeData,
        include: {
          user: true,
        },
      });
      return pet;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deletePet = async (id) => {
    try {
      const pet = await prisma.pet.delete({
        where: { id: parseInt(id) },
      });
      return pet;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const adoptPet = async (id, userId) => {
    const idNumber = parseInt(id);
    const userIdNumber = parseInt(userId);
    try {
      const pet = await prisma.pet.update({
        where: { id: idNumber },
        data: {
          status: "INACTIVE",
          userId: userIdNumber,
        },
        include: {
          user: true,
        },
      });
      return pet;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      prisma.$disconnect();
    }
  };

  return {
    createPet,
    getAllPets,
    petByID,
    updatePet,
    deletePet,
    adoptPet,
  };
};
