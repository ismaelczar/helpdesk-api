import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string(),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PASSWORD: z.string().optional(),
    REDIS_DB: z.coerce.number().default(0),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string().default("appuser"),
    DB_PASS: z.string().default("secretpass"),
    DB_NAME: z.string().default("appdb"),
    APPLICATION: z.string().default("helpdesk-api"),
    ACRONYM_ENVIRONMENT: z.string().default("DEV"),
    API_BASE_URL: z.string().default("http://localhost:3333"),
});

const env = envSchema.parse(process.env);

export default env;
