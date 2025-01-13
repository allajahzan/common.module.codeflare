import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../errors/error.forbidden";
import { UnauthorizedError } from "../errors/error.unauthorized";

/**
 * Interface for the JWT payload.
 */
export interface JwtPayloadType {
    userId: string;
    role: string;
}

/**
 * Utility function to generate a JWT token.
 * @param payload - The token payload.
 * @param secret - The secret key for signing the token.
 * @param expiresIn - The duration until the token expires.
 * @returns The signed JWT token.
 */
export const generateJwtToken = (
    payload: JwtPayloadType,
    secret: string,
    expiresIn: string
): string => {
    return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Utility function to check if a token is expired.
 * @param token - The JWT token to check.
 * @returns `true` if the token is expired, otherwise `false`.
 * @throws `ForbiddenError` if the token does not have an expiration.
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwt.decode(token) as JwtPayload | null;

        if (!decoded || !decoded.exp) {
            throw new ForbiddenError();
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (err) {
        console.error("Error decoding token:", err);
        throw new Error("Internal Server Error");
    }
};

/**
 * Middleware to verify an access token.
 * @param secret - The secret key used to verify the token.
 * @returns An Express middleware function.
 * @throws `ForbiddenError` if the token is not provided.
 * @throws `UnauthorizedError` if the token is expired or invalid.
 */
export const verifyAccessToken = (secret: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const authorizationHeader = req.headers["authorization"];
            const accessToken = authorizationHeader?.split(" ")[1];

            if (!accessToken) {
                throw new ForbiddenError();
            }

            if (isTokenExpired(accessToken)) {
                throw new UnauthorizedError("Token has expired.");
            }

            const payload = jwt.verify(accessToken, secret) as JwtPayloadType;
            console.log("Token payload:", payload);

            // Attach the decoded payload to the request headers
            req.headers["x-user"] = JSON.stringify(payload);
            next();
        } catch (err: any) {
            console.error("Token verification failed:", err);
            res.status(401).json({
                message: "Unauthorized access",
                error: err.message || "Invalid token.",
            });
        }
    };
};
