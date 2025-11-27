// middleware/validateRequest.ts
import { ObjectSchema, ValidationError } from "yup";
import { Request, Response, NextFunction } from "express";

export const validateRequest =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: err.inner.map((issue) => ({
            field: issue.path,
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
