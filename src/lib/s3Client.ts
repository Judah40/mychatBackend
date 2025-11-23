import { S3Client } from "@aws-sdk/client-s3";
import {
  CLOUDFLARE_EU_ENDPOINT,
  CLOUDFLARE_KEY_ID,
  CLOUDFLARE_SECRET_ACCESS_KEY,
} from "Config/defaults";

export const s3 = new S3Client({
  endpoint: CLOUDFLARE_EU_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_KEY_ID,
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY,
  },
  region: "auto",
});
