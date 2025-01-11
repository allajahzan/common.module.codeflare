import { Response } from "express";

/**
 * Enumeration for HTTP status codes.
 */
export enum HTTPStatusCodes {
    OK = 200,
    CREATED = 201,
    VERIFIED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
}

/**
 * Enumeration for common response messages.
 */
export enum ResponseMessage {
    SUCCESS = "Operation successful",
    CREATED = "Resource successfully created",
    VERIFIED = "Resource verified",
    BAD_REQUEST = "Bad request",
    UNAUTHORIZED = "Unauthorized access",
    FORBIDDEN = "Access forbidden",
    NOT_FOUND = "Resource not found",
    INTERNAL_SERVER_ERROR = "Internal server error",
    BAD_GATEWAY = "Bad gateway",
}

/**
 * Function to send JSON responses.
 * @param res - Express Response object
 * @param status - HTTP status code
 * @param message - Response message
 * @param data - Optional response data
 * @returns The response object.
 */

export const SendResponse = (
    res: Response,
    status: number,
    message: string,
    data?: any
) => {
    try {
        return res
            .status(status)
            .json({ message, ...(data !== undefined && data !== null && { data }) });
    } catch (err: any) {
        throw new Error(err);
    }
};
