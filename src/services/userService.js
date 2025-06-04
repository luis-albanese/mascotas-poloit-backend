import { userModel } from "../models/userModel.js";

export const userService = () => {
  // Extraemos las funciones de userModel
  const { createUser, findUserByMail } = userModel();
  // Servicio para crear usuario
  const create = async (data) => {
    // Utilizamos el model
    const user = await createUser(data);
    // Devolvemos el usuario
    return user;
  };
  // Servicio para encontrar usuario por email
  const findUser = async (email) => {
    // Utilizamos el model
    const user = await findUserByMail(email);
    // Devolvemos el usuario
    return user;
  };
  // Model para retornar todos los usuarios
  const findAllUsers = async () => {
    // Consulta a la base de datos para encontrar un usuario
    const users = await prisma.user.findMany();
    // Devolvemos los datos del usuario
    return users;
  };
  return {
    create,
    findUser,
    findAllUsers,
  };
};
