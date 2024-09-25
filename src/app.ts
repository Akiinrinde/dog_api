import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import breedRoute from "./routes/breed.route";
import dogRoute from "./routes/dog.route";
import morgon from "morgan";
import createHttpError, {isHttpError} from "http-errors";

const app = express(); 

app.use(morgon("dev"))
app.use(express.json());

app.use("/api/breeds", breedRoute);
app.use("/api/dogs", dogRoute);

app.use((req, res, next) =>{
    next(createHttpError(404, "Endpoint not found"))
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
    console.error(error)
    let errorMessage = "An unknown error occured";
    let statusCode = 500;
    if (isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    } 
    res.status(statusCode).json({error: errorMessage});
});

export default app; 
