import { RequestHandler } from "express";
import { breedModel } from "../models/breed.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { dogModel } from "../models/dog.model";

export const getBreeds: RequestHandler = async (req, res, next)=>{
    try {
        const breed = await breedModel.find().exec()
        res.status(200).json(breed)
    } catch (error) {
        next(error)
    }
};

export const getBreed: RequestHandler = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const breed = await breedModel.findById(id).exec();
        res.status(200).json(breed)
    } catch (error) {
        next(error)
    }
};

export const createBreed: RequestHandler= async (req, res, next) => {
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

export const updateBreed: RequestHandler= async (req, res, next) => {
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

export const deleteBreed: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)){throw createHttpError(400, "Invalid note id") }

        await breedModel.findByIdAndDelete(id).exec()
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }    
}