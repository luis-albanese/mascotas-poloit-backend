import HTTP_STATUS from "../utils/httpStatus.js";
import { userService } from "../services/userService.js";
import createUserSchema from "../schemas/createUserSchema.js";

export const userController = () => {
  // Extraemos funciones del Service
  const { create, findUser } = userService();
  // Controlador para crear nuevo usuario
  const newUser = async (req, res, next) => {
    // Extraemos body
    const { body } = req;
    // Validamos los datos
    const { error: validationError } = createUserSchema.validate(body);
    // Si existe error, enviamos respuesta al usuario
    if (validationError) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: validationError.details[0].message });
    }
    // Extraemos el email del body
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
      const user = await create(body);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: "User created successfully", user });
    } catch (error) {
      next(error);
    }
  };
  return { newUser };
};
