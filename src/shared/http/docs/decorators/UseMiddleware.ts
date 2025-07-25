import { METADATA_KEYS } from "./metadataKeys";
import type { Middleware } from "./types";

export function UseMiddleware(...middleware: Middleware[]): MethodDecorator {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(
            METADATA_KEYS.MIDDLEWARES,
            middleware,
            descriptor.value!
        );
    };
}
