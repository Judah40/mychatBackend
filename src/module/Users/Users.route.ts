import { Router } from "express";

const route = Router();

// Import controllers
import {
  AuthenticateUserController,
  GenerateAuthTokenController,
} from "./Users.controller";
import { validateRequest } from "../../middleware/validator.middleware";
import { otpSchema, phoneNumberSchema } from "../../Utils/validation/Users";
import { validateMethod } from "../../middleware/validateMethod";

// Define routes
route
  .route("/authenticate")
  .all(validateMethod(["POST"]))
  .post(validateRequest(phoneNumberSchema), AuthenticateUserController);
route
  .route("/generate-token")
  .all(validateMethod(["POST"]))
  .post(validateRequest(otpSchema), GenerateAuthTokenController);

export const UserRoute = route;
