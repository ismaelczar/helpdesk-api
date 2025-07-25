import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDUS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: Number(process.env.REDIS_DB) || 0,
    retryStrategy(times) {
        const delay = Math.min(times * 100, 2000);
        return delay;
    },
});
