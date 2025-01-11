import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/error.custom";
export const ErrorHandler = (
    error: ErrorCallback,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (error instanceof CustomError) {
            console.log(error.message);
            res.status(error.statusCode).json(error.serializeError());
        }
    } catch (err) {
        console.log(err);
        res.status(501).json({ message: "Internal Server Error" });
    }
};
