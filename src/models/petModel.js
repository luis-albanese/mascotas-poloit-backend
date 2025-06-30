import { prisma } from "../config/prisma.js";

export const petModel = () => {
  // Model para crear mascota
  const createPet = async (data) => {
    // Consulta a la base de datos para crear un usuario
    try {
      // Función create de prisma para crear una mascota
      const pet = await prisma.pet.create({
        // Enviamos la data recibida para solicitar la creación
        data,
      });
      // Devolvemos los datos de la mascota
      return pet;
    } catch (error) {
      // Error por si falla
      throw new Error(error);
    } finally {
      prisma.$disconnect();
    }
  };
  const getAllPets = async () => {
    try {
      const pets = await prisma.pet.findMany();
      return pets;
    } catch (error) {
      throw new Error(error);
    } finally {
      prisma.$disconnect();
    }
  };
  const petByID = async (id) => {
    try {
      const pet = await prisma.pet.findUnique({
        where: { id: parseInt(id) },
      });
      return pet;
    } catch (error) {
      throw new Error(error);
    } finally {
      prisma.$disconnect();
    }
  };
  const updatePet = async (id, data) => {
    const idNumber = parseInt(id);
    try {
      const petFound = await prisma.pet.findUnique({
        where: { id: idNumber },
      });
  
      if (!petFound) {
        throw new Error("Mascota no encontrada");
      }
  
      // Evitá pisar el ID
      const { id: _, ...safeData } = data;
  
      const pet = await prisma.pet.update({
        where: { id: idNumber },
        data: safeData, // ← ya no incluye el id
      });
  
      return pet;
    } catch (error) {
      throw new Error(error);
    } finally {
      prisma.$disconnect();
    }
  };
  
  const deletePet = async (id) => {
    try {
      const pet = await prisma.pet.delete({
        where: { id: parseInt(id) },
      });
      return pet;
    } catch (error) {
      throw new Error(error);
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
  };
};
