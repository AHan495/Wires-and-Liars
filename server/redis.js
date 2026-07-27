import * as Sentry from "@sentry/node";
import { createClient } from "redis";
import dotenv from "dotenv";
import { getErrorAttributes } from "./utils/logger.js";

dotenv.config();

export const redis = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

redis.on("error", (error) => {
  Sentry.logger.error("Redis client error.", getErrorAttributes(error));
});

export async function connectRedis() {
  if (redis.isOpen) return;
  await redis.connect();
}
