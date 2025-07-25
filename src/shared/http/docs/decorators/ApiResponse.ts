import { METADATA_KEYS } from "./metadataKeys";

interface ApiResponseOptions {
    statusCode: number;
    description: string;
    dtoClass?: any;
    example?: any;
}

export function ApiResponse(options: ApiResponseOptions): MethodDecorator {
    return (_target, _propertyKey, descriptor: any) => {
        const existingResponses =
            Reflect.getMetadata(METADATA_KEYS.RESPONSES, descriptor.value) ||
            [];

        Reflect.defineMetadata(
            METADATA_KEYS.RESPONSES,
            [...existingResponses, options],
            descriptor.value
        );
    };
}
