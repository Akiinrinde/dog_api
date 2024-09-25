import express from "express"
import * as BreedController from "../controllers/breed.controller"

const router = express()

router.get("/", BreedController.getBreeds);
router.get("/:id", BreedController.getBreed);

router.patch("/:id", BreedController.updateBreed); 

router.post("/", BreedController.createBreed);

router.delete("/:id", BreedController.deleteBreed);

export default router