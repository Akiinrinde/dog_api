import { NextFunction, RequestHandler, Request, Response } from "express";
import { dogModel } from "../models/dog.model";
import mongoose from "mongoose";
import createHttpError from "http-errors";


export class DogController{

    public getDogs = async (req : Request, res : Response, next: NextFunction)=>{
        try {
            const dog = await dogModel.find().exec()
            res.status(200).json(dog)
        } catch (error) {
            next(error)
        }
    };
    
    public getDog: RequestHandler = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const id = req.params.id;
            if(!mongoose.isValidObjectId(id)){throw createHttpError(400, "Invalid Dog id")}
            
            const dog = await dogModel.findById(id).exec();
            if(!dog){ throw createHttpError(404, "Dog not found")}
    
            res.status(200).json(dog)
        } catch (error) {
            next(error)
        }
    };
    
    
    public createDog: RequestHandler= async (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name;
        const breed = req.body.breed;
        const age = req.body.age;
        const gender = req.body.gender
        try {
    
            if (!name || !breed){ throw createHttpError(400, "A dog must have a name and breed")}
            const newDog = await dogModel.create({
                name: name,
                breed: breed,
                age: age,
                gender: gender
            });
            res.status(201).json(newDog);
        } catch (error) {
            next(error)
        }
        
    };
    
    public updateDog: RequestHandler= async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const newName = req.body.name;
            const newBreed = req.body.breed;
            const newAge = req.body.age;
            const newGender = req.body.gender
    
            if (!mongoose.isValidObjectId(id)){ throw createHttpError(400, "Invalid dog Id")}
    
            if (!newName || !newBreed){ throw createHttpError(400, "A dog must have a name and breed")}
            
            const dog = await dogModel.findById(id).exec();
            if (!dog){throw createHttpError(404, "Dog not found")}
    
            dog.name = newName;
            dog.breed = newBreed;
            dog.age = newAge;
            dog.gender = newGender;
    
            const updatedDog = await dog.save();
            res.status(200).json(updatedDog)
        } catch (error) {
            next(error);
        }
    };
    
    public deleteDog: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            if (!mongoose.isValidObjectId(id)){throw createHttpError(400, "Invalid note id") }
    
            await dogModel.findByIdAndDelete(id).exec()
            res.sendStatus(204);
        } catch (error) {
            next(error)
        }    
    };
    
    public findDogsbyBreed: RequestHandler= async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const dogs = await dogModel.find().where("breed").equals(id).exec()
            res.status(200).json(dogs)
        } catch (error) {
            next(error)
        }
    }
}
