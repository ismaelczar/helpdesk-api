import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/shared/core/erros/AppError";

export function handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const isAppError = err instanceof AppError;

    const statusCode = isAppError ? err.statusCode : 500;
    const errorType = isAppError ? err.type : "unknown";

    res.status(statusCode).json({
        status: "error",
        message: isAppError ? err.message : "Erro interno no servidor",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // opcional
    });
}
