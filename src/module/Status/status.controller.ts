import { Request, Response } from "express";
import {
  deleteStatusService,
  getAllStatusService,
  getSingleStatusService,
  saveStatusService,
} from "./status.service";
import { bufferToBlob } from "../../Utils/bufferToBlob";
import { errorResponse, success } from "../../Utils/response";

export const saveStatusController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: userId } = req.user!;
  const file = req.file!;
  const { caption } = req.body;
  const Body = bufferToBlob(file!);

  try {
    const savedStatus = await saveStatusService({
      caption,
      image: Body,
      userId,
    });
    return success(res, savedStatus, "SUCCESSFULLY UPLOADED STATUS", 201);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getSingleStatusController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const status = await getSingleStatusService(id);
    return success(res, status, "SUCCESSFULLY GOTTEN STATUS", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getAllStatusController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const statuses = await getAllStatusService();
    return success(res, statuses, "SUCCESSFULLY GOTTEN ALL STATUS", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteStatusController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { id: userId } = req.user!;
  try {
    const deleteStatus = await deleteStatusService({ id, userId });
    return success(res, deleteStatus, "SUCCESSFULLY DELETED STATUS", 200);
  } catch (error) {
    return errorResponse(res, error);
  }
};
