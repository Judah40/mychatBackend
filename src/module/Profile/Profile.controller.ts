import { Request, Response } from "express";
import { updateProfileDetails, uploadProfilePicture } from "./Profile.service";
import { errorResponse, success } from "../../Utils/response";
import { bufferToBlob } from "../../Utils/bufferToBlob";

//Controller to handle updating user profilr
export const updateProfileDetailsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstName, lastName, middleName } = req.body;
  const { id: userId } = req.user!;
  try {
    await updateProfileDetails({
      firstName,
      lastName,
      middleName,
      userId,
    });
    return success(res, null, "SUCCESSFULLY UPDATED PROFILE PICTURE", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};

//Controller to handle picture upload
export const profilePictureController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const profilePicture = req.file;
  const { id: userId } = req.user!;
  console.log("profilePicture");
  const Body = bufferToBlob(profilePicture!);
  try {
    await uploadProfilePicture({ Body, userId });
    return success(res, null, "SUCCESSFULLY UPLOADED PROFILE PICTURE", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};
