import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const ACCELERATE_DATABASE_URL =
  process.env.ACCELERATE_DATABASE_URL || "";
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
export const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || "";
export const CLOUDFLARE_KEY_ID = process.env.CLOUDFLARE_KEY_ID || "";
export const CLOUDFLARE_SECRET_ACCESS_KEY =
  process.env.CLOUDFLARE_SECRET_ACCESS_KEY || "";
export const CLOUDFLARE_DEFAULT_ENDPOINT =
  process.env.CLOUDFLARE_DEFAULT_ENDPOINT || "";
export const CLOUDFLARE_EU_ENDPOINT = process.env.CLOUDFLARE_EU_ENDPOINT || "";
export const BUCKET_NAME = process.env.CLOUDFLARE_BUCKET_NAME || "";
export const JWTTOKENSECRET = process.env.JWT_TOKEN_SECRET;
export const REDISENDPOINTURL = process.env.REDIS_API_ENDPOINT;
export const STREAMACCESSKEY = process.env.STREAM_ACCESS_KEY;
export const STREAMSECRETKEY = process.env.STREAM_SECRET_KEY;
