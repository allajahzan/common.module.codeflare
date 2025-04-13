import { redisClient } from "../config/redis.connection";

// Redis class
export class Redis {
    private readonly key: string;
    constructor(key: string) {
        this.key = key;
    }
    /**
     * Set a value in Redis for the given key.
     * If ttl is provided, the value will expire after ttl seconds.
     * @param key - The key to set the value for.
     * @param value - The value to set.
     * @param ttl - The ttl in seconds, if provided.
     */
    setValue = async (value: string, ttl: number) => {
        try {
            if (ttl) {
                await redisClient.setEx(this.key, ttl, value);
            } else {
                await redisClient.set(this.key, value);
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
    getValue = async () => {
        try {
            return await redisClient.get(this.key);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    /**
     * Deletes a value from Redis for the given key.
     * @param key - The key to delete the value for.
     */
    deleteValue = async () => {
        try {
            await redisClient.del(this.key);
        } catch (err: unknown) {
            console.log(err);
        }
    };
}