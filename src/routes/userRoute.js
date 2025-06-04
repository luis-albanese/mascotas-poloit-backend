import { Router } from "express";
import { userController } from "../controllers/userController.js";
export const userRoutes = () => {
  const userRoute = Router();
  const { newUser } = userController();
  userRoute.post("/new", newUser);
  return userRoute;
};
