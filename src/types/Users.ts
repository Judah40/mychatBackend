export interface User {
  otp: string | null;
}

export interface tokenPayload {
  otp: string;
}

export interface tokenPromise {
  userToken: string;
  streamToken: string;
}
