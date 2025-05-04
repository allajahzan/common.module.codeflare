import { Response } from "express";

/**
 * Sends an HTTP response with a given status, message, and optional data.
 * @param {Response} res - The Express response object to send the response.
 * @param {number} status - The HTTP status code for the response.
 * @param {string} message - A message describing the response.
 * @param {any} data - Optional data to include in the response body.
 * @throws {Error} Will throw an error if there is an issue sending the response.
 */
export const SendResponse = (
    res: Response,
    status: number,
    message: string,
    data?: any
) : any => {
    try {
        return res
            .status(status)
            .json({ message, ...(data !== undefined && data !== null && { data }) });
    } catch (err: any) {
        throw new Error(err);
    }
};
