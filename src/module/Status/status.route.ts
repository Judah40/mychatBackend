import { Router } from "express";
import { validateMethod } from "../../middleware/validateMethod";

import { multerMiddleware } from "../../middleware/multer";
import { validateRequest } from "../../middleware/validator.middleware";
import {
  deleteStatusController,
  getAllStatusController,
  getMyStatusController,
  getSingleStatusController,
  saveStatusController,
} from "./status.controller";
import { statusValidationSchema } from "../../Utils/validation/status";

const route = Router();

route
  .route("/")
  .post(
    multerMiddleware,
    validateRequest(statusValidationSchema),
    saveStatusController
  );

route.route("/").get(getAllStatusController);
route.route("/me").get(getMyStatusController);

route.route("/:id").get(getSingleStatusController);

route.route("/:id").delete(deleteStatusController);
export const statusRoute = route;
