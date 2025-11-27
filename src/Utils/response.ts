import { Response } from "express";

// utils/response.ts
export function success(
  res: Response,
  data?: any,
  message = "OK",
  status = 200
) {
  return res.status(status).json({ success: true, message, data });
}

export function errorResponse(res: Response, err: unknown, status = 400) {
  const message = err instanceof Error ? err.message : "Unknown error";
  return res.status(status).json({ success: false, message });
}
