import { NextFunction, RequestHandler, Request, Response } from "express";
import { breedModel } from "../models/breed.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export class BreedController{
    public getBreeds: RequestHandler = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const breed = await breedModel.find().exec()
            res.status(200).json(breed)
        } catch (error) {
            next(error)
        }
    };
    
    public getBreed: RequestHandler = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const id = req.params.id;
            const breed = await breedModel.findById(id).exec();
            res.status(200).json(breed)
        } catch (error) {
            next(error)
        }
    };
    
    public createBreed: RequestHandler= async (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name;
        const country = req.body.country;
        const description = req.body.description;
        try {
            const newBreed = await breedModel.create({
                name: name,
                country: country,
                description: description
            });
            res.status(201).json(newBreed);
        } catch (error) {
            next(error)
        }    
    };
    
    public updateBreed: RequestHandler= async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id
            const newName = req.body.name;
            const newCountry = req.body.country;
            const newDescription = req.body.description;
    
            if (!mongoose.isValidObjectId(id)){ throw createHttpError(400, "Invalid dog Id")}
    
            if (!newName){ throw createHttpError(400, "A breed must have a name")}
            
            const breed = await breedModel.findById(id).exec();
            if (!breed){throw createHttpError(404, "Breed not found")}
    
            breed.name = newName;
            breed.country = newCountry;
            breed.description = newDescription;
    
    
            const updatedBreed = await breed.save();
            res.status(200).json(updatedBreed)
        } catch (error) {
            next(error);
        }
    };
    
    public deleteBreed: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            if (!mongoose.isValidObjectId(id)){throw createHttpError(400, "Invalid note id") }
    
            await breedModel.findByIdAndDelete(id).exec()
            res.sendStatus(204);
        } catch (error) {
            next(error)
        }    
    };
}


