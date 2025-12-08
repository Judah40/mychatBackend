import { Blob } from "buffer";

export interface statusServicePropsType {
  image: Blob;
  caption: string;
  userId: string;
}
