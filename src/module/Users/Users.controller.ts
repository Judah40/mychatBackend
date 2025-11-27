import { Request, Response } from "express";
import {
  AuthenticateUserService,
  GenerateAuthTokenService,
} from "./Users.service";
import { errorResponse, success } from "../../Utils/response";

// Controller to handle user authentication requests
export const AuthenticateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { phoneNumber } = req.body;
  try {
    const user = await AuthenticateUserService(phoneNumber);
    return success(res, user, "USER AUTHENTICATED SUCCESSFULLY", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};

//Controller to handle token generation after OTP verification

export const GenerateAuthTokenController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { otp } = req.body;
  try {
    const token = await GenerateAuthTokenService(otp);
    return success(res, { token }, "TOKEN GENERATED SUCCESSFULLY", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};
