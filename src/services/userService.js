import { userModel } from "../models/userModel.js";
import { verified } from "../utils/bcrypt.js";
import { verifyToken } from "../utils/jwtUtils.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenManagment.js";

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
  // Servicio para iniciar sesión
  const login = async (email, password) => {
    const user = await findUser(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await verified(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { accessToken, refreshToken };
  };
  // Servicio para refrescar token
  const refreshTokenUser = async (refreshToken) => {
    const decoded = verifyToken(refreshToken, "refresh");
    if (!decoded) {
      throw new Error("Invalid refresh token");
    }
    const user = await findUser(decoded.email);
    if (!user) {
      throw new Error("User not found");
    }
    const accessToken = generateAccessToken(user);

    return accessToken;
  };
  return {
    create,
    findUser,
    allUsers,
    update,
    login,
    refreshTokenUser,
  };
};
