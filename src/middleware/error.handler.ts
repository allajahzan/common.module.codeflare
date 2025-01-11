import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/error.custom";
export const ErrorHandler = (
    error: ErrorCallback,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(error);
        if (error instanceof CustomError) {
            res.status(error.statusCode).json(error.serializeError());
        }else{
            res.status(500).json({message:error})
        }
    } catch (err:any) {
        console.log(err);
        res.status(501).json({ message: err.message });
    }
};
