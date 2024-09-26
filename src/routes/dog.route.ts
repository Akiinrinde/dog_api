import express from "express";
import { DogController } from "../controllers/dog.controller";

const dogController = new DogController()

const router = express()
router.get("/", dogController.getDogs);
router.get("/:id", dogController.getDog)

router.patch("/:id", dogController.updateDog)

router.post("/", dogController.createDog);

router.delete("/:id", dogController.deleteDog);

router.get("/findDogsByBreed/:id", dogController.findDogsbyBreed)

export const dogRoute = router