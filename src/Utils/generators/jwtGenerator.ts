import { JWTTOKENSECRET } from "../../Config/defaults";
import jwt from "jsonwebtoken";
// Function to generate a JWT token for user authentication

interface dataTypes {
  id: string;
}
export const UserTokenGenerator = (data: dataTypes) => {
  const Jwt = jwt.sign({ data }, JWTTOKENSECRET || "default", {
    expiresIn: "100y", // Token expiration time
  });
  return Jwt;
};

// Function to generate a verification token
export const generateToken = (length: number = 32): string => {
  const verificationToken = Math.random().toString(36).substring(2, 15); // Simple token generation, consider using a more secure method
  return verificationToken;
};
