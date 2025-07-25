import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { METADATA_KEYS } from "../decorators/metadataKeys";

export async function bodyValidatorMiddleware(
    handler: Function,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const dtoClass = Reflect.getMetadata(METADATA_KEYS.BODY, handler);

    if (!dtoClass) return next(); // nada a validar

    const instance = plainToInstance(dtoClass, req.body);
    const errors = await validate(instance, { whitelist: true });

    if (errors.length > 0) {
        const formatted = errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
        }));

        return res.status(400).json({
            message: "Erro de validação",
            errors: formatted,
        });
    }

    // Substitui o body pelo objeto validado
    req.body = instance;

    return next();
}
