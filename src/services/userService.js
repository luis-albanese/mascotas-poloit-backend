import { userModel } from "../models/userModel.js";

export const userService = () => {
  // Extraemos las funciones de userModel
  const { createUser, findUserByMail, findAllUsers, updateUser } = userModel();
  // Servicio para crear usuario
  const create = async (data) => {
    // Utilizamos el model
    try {
      const user = await createUser(data);
      // Devolvemos el usuario
      return user;
    } catch (error) {
      return error;
    }
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
  // Servicio para actualizar usuario
  const update = async (id, data) => {
    try {
      const user = await updateUser(id, data);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    create,
    findUser,
    allUsers,
    update,
  };
};
