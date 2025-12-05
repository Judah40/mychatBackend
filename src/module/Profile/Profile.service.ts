import {
  getObjectFromR2Bucket,
  putObjectInR2Bucket,
} from "../../module/S3/S3.service";
import { generateSecureRandomString } from "../../Utils/generators/randomStringGenerator";
import { prisma } from "../../lib/prismaClient";
import {
  profilePicturePayload,
  profilePicturePromise,
  UserDetails,
  UserDetailsPromise,
} from "../../types/Profile";

export const checkIfUserExist = async (id: string) => {
  // Check if user exist
  return await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });
};
// Function to update profile Details
export const updateProfileDetails = async (
  payload: UserDetails
): Promise<UserDetailsPromise> => {
  const { userId, ...restOfData } = payload;
  try {
    // Check if user exist
    const user = await checkIfUserExist(userId);
    //Reject promise if user doesn't exist
    if (!user) {
      return Promise.reject("USER DOESN'T EXIST");
    }

    await prisma.user.update({
      where: {
        id: payload.userId,
      },
      data: {
        ...restOfData,
      },
    });

    //Resolve true if promise complete
    return Promise.resolve({ success: true });
  } catch (error) {
    return Promise.reject(error);
  }
};

//Function upload profile picture
export const uploadProfilePicture = async (
  payload: profilePicturePayload
): Promise<profilePicturePromise> => {
  const { Body, userId } = payload;
  try {
    const user = await checkIfUserExist(userId);
    if (!user) {
      return Promise.reject("USER DOESN'T EXIST");
    }
    //generate file Name
    const randomName = generateSecureRandomString(16);
    const fileName = `${randomName}.${Body.type.split("/")[1]}`;
    const Key = `users/${userId}/profile-pictures/${
      user?.profilePicture || fileName
    }`;
    //Upload image
    const uploadImage = await putObjectInR2Bucket({
      Body,
      Key,
      ContentType: Body.type,
    });

    if (!uploadImage) {
      return Promise.reject("COULDN'T UPLOAD PROFILE");
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePicture: Key,
      },
    });
    return Promise.resolve({
      success: true,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserProfile = async (id: string) => {
  if (!id) throw new Error("ID IS REQUIRED");
  let profileUrl;
  try {
    const user = await checkIfUserExist(id);
    if (!user) throw new Error("USER DOES NOT EXIST");
    const { profilePicture, ...restOfData } = user;
    if (profilePicture) {
      profileUrl = await getObjectFromR2Bucket({ Key: profilePicture });
    }
    return Promise.resolve({
      success: true,
      User: {
        profilePicture: profileUrl,
        ...restOfData,
      },
    });
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
};
