import { Router } from "express";
import { petController } from "../controllers/petController.js";

export const petRoutes = () => {
  const petRoute = Router();
  const { newPet, getAllPets } = petController();
  petRoute.route("/create").post(newPet);
  petRoute.route("/").get(getAllPets);
  return petRoute;
};
