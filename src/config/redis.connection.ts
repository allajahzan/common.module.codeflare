import { createClient } from "redis";

// Create redis client
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// Redis events
redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("ready", () => console.log("Redis is ready to use"));
redisClient.on("reconnecting", () => console.log("Redis reconnecting..."));
redisClient.on("end", () => console.log("Redis connection closed"));
redisClient.on("error", (err) => console.log("Redis Client Error", err));

// Redid connection
const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err: unknown) {
    console.log(err);
  }
};

export { redisClient, connectRedis };
