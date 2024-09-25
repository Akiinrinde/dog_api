import {Dog} from "../interfaces/dog.interface"
import {Document, model, Schema} from 'mongoose';

const dogSchema = new Schema({
    name: {
        type: String,
        required: true, 
    }, 
    age:{
        type: Number,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    
    },
    breed: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'breed',
        required: true
      },
},
{
    timestamps: true,
});

export const dogModel = model<Dog & Document>('Dog', dogSchema);