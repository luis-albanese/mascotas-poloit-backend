import HTTP_STATUS from "../utils/httpStatus.js";
import { userService } from "../services/userService.js";
import {
  createUserSchema,
  updateUserSchema,
  loginSchema,
} from "../schemas/userSchema.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenManagment.js";

export const userController = () => {
  // Extraemos funciones del Service
  const { create, findUser, allUsers, update, login, refreshTokenUser } =
    userService();
  // Controlador para crear nuevo usuario
  const newUser = async (req, res, next) => {
    // Extraemos body
    const data = req.body;
    // Validamos los datos
    const { error: validationError } = createUserSchema.validate(data);
    // Si existe error, enviamos respuesta al usuario
    if (validationError) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: validationError.details[0].message });
    }
    // // Extraemos el email del body
    const { email } = data;

    // Verificamos si existe el usuario
    const existingUser = await findUser(email);
    if (existingUser) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "User already exists" });
    }

    try {
      // Creamos nuevo usuario
      const user = await create(data);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: "User created successfully", user });
    } catch (error) {
      next(error);
    }
  };
  // Controlador para obtener todos los usuarios
  const getUsers = async (_req, res, next) => {
    try {
      const users = await allUsers();
      res
        .status(HTTP_STATUS.OK)
        .json({ message: "Users retrieved successfully", users });
    } catch (error) {
      next(error);
    }
  };
  // Controlador para actualizar usuario
  const updateDataUser = async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;
    const { error: validationError } = updateUserSchema.validate(data);
    // Si existe error, enviamos respuesta al usuario
    if (validationError) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: validationError.details[0].message });
    }
    // Verificamos si existe el usuario
    const existingUser = await findUser(id);
    if (!existingUser) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "User not found" });
    }
    try {
      const user = await update(id, data);
      res
        .status(HTTP_STATUS.OK)
        .json({ message: "User updated successfully", user });
    } catch (error) {
      next(error);
    }
  };
  // Controlador para iniciar sesión
  const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const data = { email, password };
    // Validamos los datos
    const { error: validationError } = loginSchema.validate(data);
    // Si existe error, enviamos respuesta al usuario
    if (validationError) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: validationError.details[0].message });
    }
    try {
      const { accessToken, refreshToken } = await login(email, password);
      res.status(HTTP_STATUS.OK).json({
        message: "User logged in successfully",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };
  // Controlador para refrescar token
  const refreshToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Refresh token is required" });
    }

    try {
      const accessToken = await refreshTokenUser(token);
      res.json({
        accessToken,
        message: "Access token refreshed successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  return { newUser, getUsers, updateDataUser, loginUser, refreshToken };
};
