import { Request } from "express";
import "express";

// Define the shape of your user object
interface UserPayload {
  id: string; // Or whatever type your user ID is
}

// Extend the Express Request interface
declare module "express" {
  export interface Request {
    user?: UserPayload; // Use `?` if the property is optional
  }
}

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      userType: "WORKER" | "EMPLOYER";
    };
  }
}
