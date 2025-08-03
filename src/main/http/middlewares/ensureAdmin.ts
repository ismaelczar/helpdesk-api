import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/shared/core/erros/AppError";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const role = req.user?.role;

    if (role !== "admin")
        throw new AppError("Access denied: admin only", 403, "auth");

    return next();
}
