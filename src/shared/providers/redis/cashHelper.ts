import { redis } from "./RedisClient";

export async function getCache<T = any>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
}

export async function setCache(
    key: string,
    value: any,
    ttlInSeconds = 300
): Promise<void> {
    await redis.set(key, JSON.stringify(value), "EX", ttlInSeconds);
}

export async function deleteCache(key: string): Promise<void> {
    await redis.del(key);
}
