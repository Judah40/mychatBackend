import { STREAMACCESSKEY, STREAMSECRETKEY } from "../Config/defaults";
import { StreamChat } from "stream-chat";

export const streamClient = StreamChat.getInstance(
  STREAMACCESSKEY!,
  STREAMSECRETKEY
);
