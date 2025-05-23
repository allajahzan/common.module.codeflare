import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error/custom";

/**
 * Express middleware for centralized error handling.
 * @param error - The error that occurred during request processing.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(error.message);

    if (error instanceof CustomError) {
        res.status(error.statusCode).json({ errors: error.serializeError() });
    } else {
        res.status(500).json({
            message: error.message || "Something went wrong!",
        });
    }
};
