import express from "express"
import {BreedController} from "../controllers/breed.controller"

const router = express()
const breedController = new BreedController()

router.get("/", breedController.getBreeds);
router.get("/:id", breedController.getBreed);

router.patch("/:id", breedController.updateBreed); 

router.post("/", breedController.createBreed);

router.delete("/:id", breedController.deleteBreed);

export const breedRoute = router