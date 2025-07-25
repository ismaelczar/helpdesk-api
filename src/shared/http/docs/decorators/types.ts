import type { NextFunction, Request, Response } from "express";

export type HTTPMethod = "get" | "post" | "put" | "delete" | "patch";
export type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;
