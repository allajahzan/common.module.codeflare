import { redisClient } from "../config/redis-connection";

/**
 * Set a value in Redis for the given key.
 * If ttl is provided, the value will expire after ttl seconds.
 * @param key - The key to set the value for.
 * @param value - The value to set.
 * @param ttl - The ttl in seconds, if provided.
 */
export const setValue = (key: string, value: string, ttl: number) => {
    try {
        if (ttl) {
            redisClient.setEx(key, ttl, value);
        } else {
            redisClient.set(key, value);
        }
    } catch (err: unknown) {
        console.log(err);
    }
};

/**
 * Retrieve a value from Redis for the given key.
 * @param key - The key to retrieve the value for.
 * @returns The value associated with the key, or null if not found.
 */
export const getValue = (key: string) => {
    try {
        return redisClient.get(key);
    } catch (err: unknown) {
        console.log(err);
    }
};

/**
 * Deletes a value from Redis for the given key.
 * @param key - The key to delete the value for.
 */
export const deleteValue = (key: string) => {
    try {
        redisClient.del(key);
    } catch (err: unknown) {
        console.log(err);
    }
};

