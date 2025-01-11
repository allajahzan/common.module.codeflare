import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/error.custom";

/**
 * Global error-handling middleware for Express.
 * @param error - The error object passed to the middleware.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The Express NextFunction.
 */
export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Error occurred:", error);

    if (error instanceof CustomError) {
        // Handle custom errors
        res.status(error.statusCode).json({ errors: error.serializeError() });
    } else {
        // Handle generic or unknown errors
        res.status(500).json({
            message: "Internal Server Error",
            details: error.message || "An unexpected error occurred.",
        });
    }
};
