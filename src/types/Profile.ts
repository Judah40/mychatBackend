import { Blob } from "buffer";

export interface UserDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  userId: string;
}

export interface UserDetailsPromise {
  success: true;
}

export interface profilePicturePayload {
  Body: Blob;
  userId: string;
}

export interface profilePicturePromise {
  success: true;
}
