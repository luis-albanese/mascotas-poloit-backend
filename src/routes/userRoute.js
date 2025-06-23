import { Router } from "express";
import { userController } from "../controllers/userController.js";

export const userRoutes = () => {
  // Iniciamos Router de express
  const userRoute = Router();
  // Extraemos funciones del Controller
  const { newUser, getUsers, updateDataUser, loginUser, refreshToken } =
    userController();
  // Ruta para crear usuario
  userRoute.route("/create").post(newUser);
  // Ruta para obtener usuarios
  userRoute.route("/").get(getUsers);
  // Ruta para actualizar usuario
  userRoute.route("/:id").patch(updateDataUser);
  // Ruta para iniciar sesión
  userRoute.route("/login").post(loginUser);
  // Ruta para refrescar token
  userRoute.route("/refresh-token").post(refreshToken);
  // Devolvemos el router
  return userRoute;
};
