import { userModel } from "../models/userModel.js";

export const userService = () => {
  // Extraemos las funciones de userModel
  const { createUser, findUserByMail, findAllUsers } = userModel();
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
  // Servicio para encontrar todos los usuarios
  const allUsers = async () => {
    // Utilizamos el model
    const users = await findAllUsers();
    // Devolvemos el usuario
    return users;
  };

  return {
    create,
    findUser,
    allUsers,
  };
};
