import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
    sub: string;
    email: string;
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "TOKEN MISSING" });

    const [, token] = authHeader.split(" ");

    try {
        // biome-ignore lint/style/noNonNullAssertion: <TOKEN EXIST>
        const decoded = verify(token, process.env.JWT_SECRET!);
        const { sub } = decoded as TokenPayload;

        req.user = {
            id: sub,
            email: sub,
        };

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error });
    }
}
