import prisma from "../config/prisma.js";
import { encrypt } from "../utils/bcrypt.js";

export const userModel = () => {
  // Model para crear usuario
  const createUser = async (data) => {
    // Extraemos la contraseña
    const password = data.password;
    // Encriptamos la contraseña
    const hash = await encrypt(password);
    // Guardamos en data la contraseña encriptada
    data.password = hash;
    // Consulta a la base de datos para crear un usuario
    try {
      // Función create de prisma para crear user
      const user = await prisma.user.create({
        // Enviamos la data recibida para solicitar la creación
        data,
      });
      // Devolvemos los datos del usuario
      return user;
    } catch (error) {
      // Error por si falla
      throw new Error(error);
    } finally {
      prisma.$disconnect();
    }
  };
  // Model para encontrar usuario
  const findUserByMail = async (email) => {
    // Consulta a la base de datos para encontrar un usuario
    try {
      const user = await prisma.user.findUnique({
        // Enviamos la data recibida para solicitar la creación
        where: {
          email: email,
        },
      });
      // Devolvemos los datos del usuario
      return user;
    } catch (error) {
      throw new Error(error);
    } finally {
      prisma.$disconnect();
    }
  };
  return {
    createUser,
    findUserByMail,
  };
};
