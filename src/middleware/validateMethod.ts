import { NextFunction, Request, Response } from "express";

export const validateMethod = (allowedMethods: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowedMethods.includes(req.method)) {
      res.set("Allow", allowedMethods.join(", "));
      return res.status(405).json({
        error: "Method Not Allowed",
        message: `Method ${req.method} is not allowed for this endpoint.`,
        allowedMethods: allowedMethods,
      });
    }
    next();
  };
};
