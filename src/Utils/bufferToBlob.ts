import { Blob } from "buffer"; // available in Node >= 15

export function bufferToBlob(file: Express.Multer.File): Blob {
  return new Blob([file.buffer], { type: file.mimetype });
}

import { fileTypeFromBuffer } from "file-type";

export interface DetectedFile {
  ext: string;
  mime: string;
}

export async function detectFile(
  buffer: Buffer
): Promise<DetectedFile | undefined> {
  const result = await fileTypeFromBuffer(buffer);
  return result ? { ext: result.ext, mime: result.mime } : undefined;
}
