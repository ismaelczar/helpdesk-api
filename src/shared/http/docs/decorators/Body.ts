import { METADATA_KEYS } from "./metadataKeys";

export function Body(dtoClass: any): MethodDecorator {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(METADATA_KEYS.BODY, dtoClass, descriptor.value!);
    };
}
