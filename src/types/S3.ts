import { Blob } from "buffer";

export interface putObjectParams {
  Key: string;
  Body: Buffer | Uint8Array | Blob | string;
  ContentType?: string;
}

export interface getObjectParams {
  Key: string;
}
