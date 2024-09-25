import {Breed} from "../interfaces/breed.interface"
import {Document, model, Schema} from 'mongoose';

const breedSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    country: {type: String},
    description: {type: String}
},
{
    timestamps: true,
  });

export const breedModel = model<Breed & Document>('Breed', breedSchema);