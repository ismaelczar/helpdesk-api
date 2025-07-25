import { METADATA_KEYS } from "./metadataKeys";

export function Controller(basePath: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(METADATA_KEYS.BASE_PATH, basePath, target);
    };
}
