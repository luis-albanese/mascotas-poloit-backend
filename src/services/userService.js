import { userModel } from "../models/userModel.js";

export const userService = () => {
  // Extraemos las funciones de userModel
  const { createUser } = userModel();
  // Servicio para crear usuario
  const create = async (data) => {
    // Utilizamos el model
    const user = await createUser(data);
    // Devolvemos el usuario
    return user;
  };
  return {
    create,
  };
};
