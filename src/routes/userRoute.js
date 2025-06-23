import { Router } from "express";
import { userController } from "../controllers/userController.js";

export const userRoutes = () => {
  // Iniciamos Router de express
  const userRoute = Router();
  // Extraemos funciones del Controller
  const { newUser, getUsers, updateDataUser } = userController();
  // Ruta para crear usuario
  userRoute.route("/create").post(newUser);
  // Ruta para obtener usuarios
  userRoute.route("/").get(getUsers);
  // Ruta para actualizar usuario
  userRoute.route("/:id").patch(updateDataUser);
  // Devolvemos el router
  return userRoute;
};
