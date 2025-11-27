import { REDISENDPOINTURL } from "../Config/defaults";
import { createClient } from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";

//REDIS CLIENT
export const redisClient = createClient({
  url: REDISENDPOINTURL,
});

redisClient.on("error", (error) => {
  console.error("REDIS CLIENT ERROR", error);
});

//REDIS RATE LIMITER CLIENT
export const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rate_limit",
  points: 10,
  duration: 1,
  blockDuration: 10,
});
