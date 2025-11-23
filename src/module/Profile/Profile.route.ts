import { Router } from "express";
import { validateMethod } from "../../middleware/validateMethod";
import {
  profilePictureController,
  updateProfileDetailsController,
} from "./Profile.controller";
import { multerMidleware } from "../../middleware/multer";
import { validateRequest } from "../../middleware/validator.middleware";
import { profileSchema } from "../../Utils/validation/Profile";

const route = Router();

route
  .route("/upload-profile")
  .all(validateMethod(["PATCH"]))
  .post(multerMidleware.array("file"), profilePictureController);
route
  .route("/profile-picture")
  .all(validateMethod(["PATCH"]))
  .post(validateRequest(profileSchema), updateProfileDetailsController);

export const profileRoute = route;
