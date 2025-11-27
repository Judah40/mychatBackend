////////////////////////////////////////////////////////////////////////////////////////////

import { JWTTOKENSECRET } from "../Config/defaults";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function getAuthToken(req: Request): string | null {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
}

////////////////////////////////////////////////////////////////////////////////////////////
//VERIFY JWT TOKEN
export const requireAuthenticatedUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = getAuthToken(req);
    if (!token) {
      res
        .status(401)
        .json({ error: "Authorization header missing or incorrect format." });
      return;
    }

    const decoded = jwt.verify(
      token,
      JWTTOKENSECRET || "default"
    ) as jwt.JwtPayload;
    if (!decoded?.id) {
      res
        .status(401)
        .json({ message: "Invalid Authentication Token. Please Try Again" });
      return;
    }

    // ✅ TypeScript now knows req.user exists
    req.user = {
      id: decoded?.id,
    };

    next();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication Failed";

    if (message === "invalid signature") {
      res
        .status(401)
        .json({ message: "Invalid Authentication Token. Please Try Again" });
      return;
    }
    if (message === "jwt expired") {
      res.status(401).json({ message: "Session Expired. Please Login Again" });
      return;
    }

    res.status(401).json({ message });
    return;
  }
};
