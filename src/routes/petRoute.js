import { Router } from "express";
import { petController } from "../controllers/petController.js";

export const petRoutes = () => {
  const petRoute = Router();
  const { newPet, getAllPets, petByID, updatePet, deletePet, adoptPet } =
    petController();
  petRoute.route("/create").post(newPet);
  petRoute.route("/").get(getAllPets);
  petRoute.route("/adopt/:id").patch(adoptPet);
  petRoute.route("/:id").get(petByID).patch(updatePet).delete(deletePet);
  return petRoute;
};
