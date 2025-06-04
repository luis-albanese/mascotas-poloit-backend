import HTTP_STATUS from "../utils/httpStatus.js";
import { userService } from "../services/userService.js";
import createUserSchema from "../schemas/createUserSchema.js";

export const userController = () => {
  // Extraemos funciones del Service
  const { create } = userService();
  // Controlador para crear nuevo usuario
  const newUser = async (req, res, next) => {
    // Extraemos body
    const { body } = req;
    const { error: validationError } = createUserSchema.validate(body);
    if (validationError) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: validationError.details[0].message });
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
