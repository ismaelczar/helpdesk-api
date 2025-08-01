import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface JwtPayload {
    id: string;
    email: string;
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({ message: "JWT_SECRET not configured" });
    }

    try {
        const decoded = verify(token, jwtSecret) as JwtPayload;
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        return next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
