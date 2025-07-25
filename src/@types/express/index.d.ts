// src/@types/express/index.d.ts
import "express";

declare module "express" {
    export interface Request {
        user?: {
            id: string;
            email: string;
            [key: string]: any;
        };
    }
}
