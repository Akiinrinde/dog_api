import express from "express"
import * as DogController from "../controllers/dog.controller"

const router = express()
router.get("/", DogController.getDogs);
router.get("/:id", DogController.getDog)

router.patch("/:id", DogController.updateDog)

router.post("/", DogController.createDog);

router.delete("/:id", DogController.deleteDog);

router.get("/findDogsByBreed/:id", DogController.findDogsbyBreed)

export default router