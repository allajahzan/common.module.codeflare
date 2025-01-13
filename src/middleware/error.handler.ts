import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/error.custom";

/**
 * Express middleware for centralized error handling.
 *
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
