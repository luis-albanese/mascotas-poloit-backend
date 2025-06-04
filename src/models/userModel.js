import prisma from "../config/prisma";
import { encrypt } from "../utils/bcrypt";

export const userModel = () => {
  // Model para crear usuario
  const createUser = async (data) => {
    // Extraemos la contraseña
    const password = data.password;
    // Encriptamos la contraseña
    const hash = await encrypt(password);
    // Guardamos en data la contraseña encriptada
    data.password = hash;
    try {
      const user = await prisma.user.create({
        data,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    createUser,
  };
};
