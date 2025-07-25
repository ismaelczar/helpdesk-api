import type { Application, NextFunction, Request, Response } from "express";
import { bodyValidatorMiddleware } from "../utils/bodyValidatorMiddleware";
import { getAllControllers } from "../utils/getAllControllers";
import { METADATA_KEYS } from "./metadataKeys";
import type { HTTPMethod } from "./types";

export async function registerRoutes(app: Application) {
    const controllers = await getAllControllers();

    for (const Controller of controllers) {
        const instance = new Controller(); // instância criada corretamente
        const basePath: string = Reflect.getMetadata(
            METADATA_KEYS.BASE_PATH,
            Controller
        );

        const propertyNames = Object.getOwnPropertyNames(
            Controller.prototype
        ).filter((prop) => prop !== "constructor");

        for (const propertyName of propertyNames) {
            const method = instance[propertyName];
            const routePath = Reflect.getMetadata(METADATA_KEYS.PATH, method);
            const httpMethod = Reflect.getMetadata(
                METADATA_KEYS.METHOD,
                method
            ) as HTTPMethod | undefined;

            const middlewares =
                Reflect.getMetadata(METADATA_KEYS.MIDDLEWARES, method) || [];

            if (routePath && httpMethod) {
                const fullPath = `/${basePath}/${routePath}`.replace(
                    /\/+/g,
                    "/"
                );

                app[httpMethod](
                    fullPath,
                    [
                        ...middlewares,
                        async (req, res, next) =>
                            await bodyValidatorMiddleware(
                                method,
                                req,
                                res,
                                next
                            ),
                    ],
                    async (req: Request, res: Response, next: NextFunction) => {
                        try {
                            await method.call(instance, req, res, next);
                        } catch (err) {
                            next(err);
                        }
                    }
                );
            }
        }
    }
}
