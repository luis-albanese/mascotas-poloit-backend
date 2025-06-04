import { Router } from "express";
import { userController } from "../controllers/userController.js";

export const userRoutes = () => {
  // Iniciamos Router de express
  const userRoute = Router();
  // Extraemos funciones del Controller
  const { newUser, getUsers } = userController();
  // Ruta para crear usuario
  userRoute.post("/new", newUser);
  // Ruta para obtener usuarios
  userRoute.get("/", getUsers);
  return userRoute;
};
