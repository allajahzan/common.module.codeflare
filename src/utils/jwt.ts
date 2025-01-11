import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../errors/error.forbiddon";
import { UnauthorizedError } from "../errors/error.unauthorized";

export interface JwtPayloadType {
    userId: string;
    role: string;
}

// Check Token validity
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

// Verify Access Token
const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers["authorization"]?.split(" ")[1];
        if (!accessToken) throw new ForbiddenError();

        if (isTokenExpired(accessToken)) {
            throw new UnauthorizedError("Token Expired");
        }

        const payload = jwt.verify(
            accessToken,
            process.env.JWT_ACCESSTOKEN_SECERET as string
        ) as JwtPayloadType;
    } catch (err) { }
};
