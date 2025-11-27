import { UserTokenGenerator } from "../../Utils/generators/jwtGenerator";
import { prisma } from "../../lib/prismaClient";
import { tokenPayload, tokenPromise, User } from "../../types/Users";
import { generateOTP } from "../../Utils/generators/OTPgenerator";
import { streamClient } from "../../lib/streamClient";

const exisitingUser = async (phoneNumber: string) => {
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber,
    },
  });
  return user;
};
// Function to authenticate or register a user based on phone number

export const AuthenticateUserService = async (
  phoneNumber: string
): Promise<User> => {
  try {
    const otp = generateOTP();
    const user = await exisitingUser(phoneNumber);

    // If user exists, generate and update OTP
    if (user) {
      const userId = user.id;
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          otp: otp,
        },
      });
      return Promise.resolve({ otp });
    }

    // If user does not exist, register new user
    const registerUser = await prisma.user.create({
      data: {
        phoneNumber,
        otp,
      },
    });

    return Promise.resolve({ otp: registerUser.otp });
  } catch (error) {
    return Promise.reject("ERROR AUTHENTICATING USER");
  }
};

//Function to generate token for authenticated user after otp verification
export const GenerateAuthTokenService = (
  payload: tokenPayload
): Promise<tokenPromise> => {
  if (!payload.otp || payload.otp.length != 6) {
    return Promise.reject("INVALID OTP PROVIDED");
  }
  try {
    const user = prisma.user.findUnique({
      where: {
        otp: payload.otp,
      },
    });

    if (!user) {
      return Promise.reject("INVALID OTP PROVIDED");
    }

    const userToken = UserTokenGenerator(user.id);
    const streamToken = streamClient.createToken(user.id);
    const tokens: tokenPromise = {
      streamToken,
      userToken,
    };
    return Promise.resolve(tokens);
  } catch (error) {
    return Promise.reject("ERROR GENERATING AUTH TOKEN");
  }
};
