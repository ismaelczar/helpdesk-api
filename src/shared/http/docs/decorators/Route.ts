import "reflect-metadata";
import { METADATA_KEYS } from "./metadataKeys";
import type { HTTPMethod } from "./types";

export function Route(method: HTTPMethod, path: string): MethodDecorator {
    return (_target, _propertyKey, descriptor: any) => {
        Reflect.defineMetadata(METADATA_KEYS.METHOD, method, descriptor.value);
        Reflect.defineMetadata(METADATA_KEYS.PATH, path, descriptor.value);
    };
}
