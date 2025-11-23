import { Blob } from "buffer"; // available in Node >= 15

export function bufferToBlob(file: Express.Multer.File): Blob {
  return new Blob([file.buffer], { type: file.mimetype });
}
