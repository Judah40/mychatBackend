import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { fileTypeFromBuffer } from "file-type";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BUCKET_NAME } from "../../Config/defaults";
import { putObjectParams, getObjectParams } from "../../types/S3";
import { s3 } from "../../lib/s3Client";
import { normalizeBody } from "../../Utils/normalizeBody";

const bucket = BUCKET_NAME;

// ---------- Upload ----------
export async function putObjectInR2Bucket(payload: putObjectParams) {
  if (!payload.Key || !payload.Body) {
    throw new Error("Key and Body are required");
  }

  const buffer = await normalizeBody(payload.Body);

  const fileType = await fileTypeFromBuffer(buffer);
  const contentType =
    payload.ContentType || fileType?.mime || "application/octet-stream";

  const params = {
    Bucket: bucket,
    Key: payload.Key,
    Body: buffer,
    ContentType: contentType,
  };

  try {
    return await s3.send(new PutObjectCommand(params));
  } catch (err) {
    console.error("R2 Upload Error:", err);
    throw new Error("Failed to upload object to R2");
  }
}

// ---------- Get (Signed URL) ----------
export async function getObjectFromR2Bucket(payload: getObjectParams) {
  const params = { Bucket: bucket, Key: payload.Key };

  try {
    return getSignedUrl(s3, new GetObjectCommand(params), {
      expiresIn: 3600,
    });
  } catch (err) {
    console.error("R2 Signed URL Error:", err);
    throw new Error("Failed to generate signed URL");
  }
}

// ---------- Delete ----------
export async function deleteObjectFromR2Bucket(payload: getObjectParams) {
  const params = { Bucket: bucket, Key: payload.Key };

  try {
    return await s3.send(new DeleteObjectCommand(params));
  } catch (err) {
    console.error("R2 Delete Error:", err);
    throw new Error("Failed to delete object");
  }
}
