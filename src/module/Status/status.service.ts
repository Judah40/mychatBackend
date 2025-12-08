import { statusServicePropsType } from "../../types/Status";
import { generateSecureRandomString } from "../../Utils/generators/randomStringGenerator";
import {
  deleteObjectFromR2Bucket,
  getObjectFromR2Bucket,
  putObjectInR2Bucket,
} from "../../module/S3/S3.service";
import { checkIfUserExist } from "../../module/Profile/Profile.service";
import { prisma } from "../../lib/prismaClient";
import { scheduleDeletion } from "../../lib/redisClient";

export const saveStatusService = async (payload: statusServicePropsType) => {
  const { caption, image, userId } = payload;
  try {
    const user = await checkIfUserExist(userId);
    if (!user) {
      return Promise.reject("USER DOESN'T EXIST");
    }
    const randomString = generateSecureRandomString(16);
    const statusName = `${randomString}.${image.type.split("/")[1]}`;
    const Key = `status/${userId}/status/${statusName}`;
    const uploadFile = await putObjectInR2Bucket({
      Body: image,
      Key,
      ContentType: image.type,
    });
    if (!uploadFile) {
      return Promise.reject("COULDN'T UPLOAD PROFILE");
    }
    const status = await prisma.status.create({
      data: {
        image: Key,
        caption,
        userId,
      },
    });
    //DELETE AFTER 24 HOURS
    await scheduleDeletion(status.id);
    //FETCH DATA AND SEND TO USERS
    const statusFile = await getObjectFromR2Bucket({ Key });
    const { image: UserImage, ...restOfData } = status;

    return {
      file: statusFile,
      ...restOfData,
    };
  } catch (error) {
    throw new Error("ERROR UPLOADING STATUS");
  }
};

//GET SINGLE STATUS
export const getSingleStatusService = async (id: string) => {
  try {
    const statusExist = await prisma.status.findUnique({
      where: { id },
    });
    if (!statusExist) throw new Error("STATUS NOT FOUND");

    const statusFileFromR2Bucket = await getObjectFromR2Bucket({
      Key: statusExist.image,
    });
    const { image, ...restOfData } = statusExist;
    return {
      file: statusFileFromR2Bucket,
      ...restOfData,
    };
  } catch (error) {
    throw new Error("ERROR GETTING STATUS");
  }
};

//GET ALL STATUS

export const getAllStatusService = async () => {
  try {
    const allStatusFromDb = await prisma.status.findMany();

    const statuses = await Promise.all(
      allStatusFromDb.map(async (data: any) => {
        const { image, ...restOfData } = data;
        const file = await getObjectFromR2Bucket({ Key: data.image });

        return {
          file,
          ...restOfData,
        };
      })
    );

    return statuses;
  } catch (error) {
    throw new Error("COULDN'T GET ALL STATUS");
  }
};

//DELETE STATUS
interface deleteStatusPropType {
  id: string;
  userId: string;
}
export const deleteStatusService = async (payload: deleteStatusPropType) => {
  const { id, userId } = payload;
  try {
    const existingStatus = await prisma.status.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!existingStatus) throw new Error("STATUS DOESN'T EXIST");
    const deleteStatusFromR2Bucket = await deleteObjectFromR2Bucket({
      Key: existingStatus.image,
    });
    if (deleteStatusFromR2Bucket.$metadata.httpStatusCode !== 204)
      throw new Error("COULDN'T DELETE STATUS");

    await prisma.status.delete({
      where: {
        id,
        userId,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    throw new Error("COULDN'T DELETE STATUS");
  }
};
