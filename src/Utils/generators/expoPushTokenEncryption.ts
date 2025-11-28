// import { encryptionTokenKey } from "../../config/default";
// import crypto from "crypto-js";

// /**
//  * Encrypt text using AES-256-GCM
//  */
// export const encryptToken = (token: string) => {
//   const excryptedData = crypto.AES.encrypt(token, encryptionTokenKey);
//   return excryptedData.toString();
// };
// /**
//  * Decrypt text using AES-256-GCM
//  */
// export const decryptToken = async (encryptedText: string) => {
//   const decryptedData = await crypto.AES.decrypt(
//     encryptedText,
//     encryptionTokenKey
//   );
//   return decryptedData.toString();
// };

// export const compareTokens = async (
//   plainText: string,
//   encryptedText: string
// ): Promise<boolean> => {
//   try {
//     const decryptedText = await decryptToken(encryptedText);
//     return decryptedText === plainText;
//   } catch (error) {
//     return false;
//   }
// };
