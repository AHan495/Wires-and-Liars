import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redis = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

redis.on("error", (error) => {
  console.error("Redis client error:", error);
});

export async function connectRedis() {
  if (redis.isOpen) return;
  await redis.connect();
}
