import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ForbiddenError } from "../errors/error.forbiddon";
import { UnauthorizedError } from "../errors/error.unauthorized";

export interface JwtPayloadType {
    userId: string;
    role: string;
}


// Verify Access Token
const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers["authorization"]?.split(" ")[1];
        if (!accessToken) throw new ForbiddenError();

        const payload = jwt.verify(
            accessToken,
            process.env.JWT_ACCESSTOKEN_SECERET as string
        ) as JwtPayloadType;
    } catch (err) { }
};
