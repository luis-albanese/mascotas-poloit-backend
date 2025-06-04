import { Router } from "express";
import { userController } from "../controllers/userController.js";

export const userRoutes = () => {
  // Iniciamos Router de express
  const userRoute = Router();
  // Extraemos funciones del Controller
  const { newUser, getUsers } = userController();
  // Ruta para crear usuario
  userRoute.route("/create").get(getUsers).post(newUser);
  return userRoute;
};
