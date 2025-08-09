import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/shared/core/erros/AppError";

export function ensureOwner(req: Request, res: Response, next: NextFunction) {
    const role = req.user?.role;

    if (role !== "owner")
        throw new AppError("Access denied: owner only", 403, "auth");

    return next();
}
