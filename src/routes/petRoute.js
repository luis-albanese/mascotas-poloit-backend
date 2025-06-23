import { Router } from "express";
import { petController } from "../controllers/petController.js";

export const petRoutes = () => {
  const petRoute = Router();
  const { newPet, getAllPets, petByID, updatePet, deletePet } = petController();
  petRoute.route("/create").post(newPet);
  petRoute.route("/").get(getAllPets);
  petRoute.route("/:id").get(petByID).patch(updatePet).delete(deletePet);
  return petRoute;
};
