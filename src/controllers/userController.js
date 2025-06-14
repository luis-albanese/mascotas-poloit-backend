import HTTP_STATUS from "../utils/httpStatus.js";
import { userService } from "../services/userService.js";
import { createUserSchema } from "../schemas/userSchema.js";

export const userController = () => {
  // Extraemos funciones del Service
  const { create, findUser, allUsers } = userService();
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
    const { email } = body;

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
  return { newUser, getUsers };
};
