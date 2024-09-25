import { Breed } from "./breed.interface";

export interface Dog{
    _id : string;
    name: string;
    age?: number;
    gender?: string;
    breed: string | Breed; 
}