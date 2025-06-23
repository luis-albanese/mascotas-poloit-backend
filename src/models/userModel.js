import { prisma } from "../config/prisma.js";
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
  // Model para retornar todos los usuarios
  const findAllUsers = async () => {
    // Consulta a la base de datos para encontrar un usuario
    try {
      const users = await prisma.user.findMany();
      // Devolvemos los datos del usuario
      return users;
    } catch (error) {
      throw new Error(error);
    } finally {
      prisma.$disconnect();
    }
  };
  const updateUser = async (id, data) => {
    try {
      const idUser = parseInt(id);
      const user = await prisma.user.update({
        where: {
          id: idUser,
        },
        data,
      });
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
    findAllUsers,
    updateUser,
  };
};
