import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../errors/error.forbidden";
import { UnauthorizedError } from "../errors/error.unauthorized";

/** Interface for the JWT payload. */
export interface JwtPayloadType {
    _id: string;
    role: string;
}

/**
 * Generates a JSON Web Token (JWT).
 * @param {JwtPayloadType} payload - The payload to be signed and stored in the JWT.
 * @param {string} secret - The secret key to sign the JWT with.
 * @param {string} expiresIn - The length of time the JWT expiry datetime.
 * @returns {string} The generated JWT.
 */
export const generateJwtToken = (
    payload: JwtPayloadType,
    secret: string,
    expiresIn: string
): string => {
    try {
        return jwt.sign(payload, secret, { expiresIn });
    } catch (err: any) {
        throw err;
    }
};

/**
 * Checks if a given JSON Web Token (JWT) has expired.
 * @param {string} token - The JWT to check for expiration.
 * @returns {boolean} - Returns `true` if the token has expired, otherwise `false`.
 * @throws {ForbiddenError} - Throws if the token is invalid or does not contain an expiration time.
 * @throws {Error} - Throws an "Internal Server Error" for any other decoding errors.
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwt.decode(token) as JwtPayload | null;

        if (!decoded || !decoded.exp) {
            throw new ForbiddenError();
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (err: any) {
        throw err;
    }
};

/**
 * Middleware to verify the JSON Web Token (JWT)
 * @param {string} secret - The secret key to verify the JWT.
 * @returns {function} Middleware function for Express.
 * @throws {ForbiddenError} - Throws if the access token is missing.
 * @throws {UnauthorizedError} - Throws if the token is expired.
 * @throws {Error} - Throws if token verification fails for any other reason.
 */
export const verifyAccessToken = (secret: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const authorizationHeader = req.headers["authorization"];
            const accessToken = authorizationHeader?.split(" ")[1];

            if (!accessToken) throw new ForbiddenError();

            if (isTokenExpired(accessToken)) throw new ForbiddenError();

            const payload = jwt.verify(accessToken, secret) as JwtPayloadType;
            
            if (!payload) throw new ForbiddenError();

            console.log("Token payload:", payload);

            req.headers["x-user-payload"] = JSON.stringify(payload);

            next();
        } catch (err: any) {
            throw err;
        }
    };
};
