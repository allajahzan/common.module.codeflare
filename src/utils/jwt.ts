import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../errors/error.forbiddon";
import { UnauthorizedError } from "../errors/error.unauthorized";

export interface JwtPayloadType {
    userId: string;
    role: string;
}

// Generate a JWT token
const GenerateJwtToken = (
    payload: JwtPayloadType,
    secret: string,
    expiresIn: string
) => {
    return jwt.sign(payload, secret, { expiresIn });
};

// Check if a token is expired
const isTokenExpired = (token: string) => {
    try {
        const decoded = jwt.decode(token) as JwtPayload | null;

        if (!decoded || !decoded.exp) {
            throw new ForbiddenError();
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (err) {
        throw new Error("Internal Server Error");
    }
};

// Middleware to verify access token
const verifyAccessToken = (secret: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers["authorization"]?.split(" ")[1];

            if (!accessToken) throw new ForbiddenError();

            if (isTokenExpired(accessToken)) {
                throw new UnauthorizedError("Token Expired");
            }

            const payload = jwt.verify(accessToken, secret) as JwtPayloadType;
            console.log(payload);

            req.headers["x-user"] = JSON.stringify(payload);
            next();
        } catch (err: any) {
            throw new Error("Internal Server Error");
        }
    };
};
