import { prisma } from "../config/prisma.js";
import { encrypt } from "../utils/bcrypt.js";

export const petModel = () => {
  // Model para crear mascota
  const createPet = async (data) => {
    // Extraemos la contraseña
    const password = data.password;
    // Encriptamos la contraseña
    const hash = await encrypt(password);
    // Guardamos en data la contraseña encriptada
    data.password = hash;
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
  return {
    createPet,
  };
};
