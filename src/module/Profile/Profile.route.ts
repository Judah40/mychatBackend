import { Request, Response, Router } from "express";
import { validateMethod } from "../../middleware/validateMethod";
import {
  profilePictureController,
  updateProfileDetailsController,
} from "./Profile.controller";
import { multerMiddleware } from "../../middleware/multer";
import { validateRequest } from "../../middleware/validator.middleware";
import { profileSchema } from "../../Utils/validation/Profile";

const route = Router();

route
  .route("/upload-profile")
  .all(validateMethod(["PATCH"]))
  .patch(validateRequest(profileSchema), updateProfileDetailsController);
route
  .route("/profile-picture")
  .all(validateMethod(["PATCH"]))
  .patch(multerMiddleware, profilePictureController);

export const profileRoute = route;
