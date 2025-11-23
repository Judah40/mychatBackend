import { NextFunction, Request, Response } from "express";
import { rateLimiter } from "../lib/redisClient";

// RATE LIMIT MIDDLEWARE
export const rateLimiterMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.ip;
    await rateLimiter.consume(key!);
    next();
  } catch (error) {
    const retryIn = (error as any)?.msBeforeNext;
    res.status(429).json({
      message: "Too many requests. Try again Later!",
      retryIn,
    });
  }
};
