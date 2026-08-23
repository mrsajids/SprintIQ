import { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../lib/jwt.js";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization =
        req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: "Access token is required",
        });
    }

    const [type, token] =
        authorization.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message:
                "Invalid authorization header",
        });
    }

    try {
        const payload =
            verifyAccessToken(token);

        req.userId = payload.userId;

        next();
    } catch {
        return res.status(401).json({
            message:
                "Invalid or expired access token",
        });
    }
}