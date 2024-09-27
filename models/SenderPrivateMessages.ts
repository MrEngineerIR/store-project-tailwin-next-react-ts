import { models, Schema, model } from "mongoose";
import { PrivateMessageSchema } from "./PrivateMessage";

const SenderPrivateMessagesSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    destinationId: {
      type: String,
      required: true,
    },
    sentPrivateMessages: [PrivateMessageSchema],
  },
  { timestamps: true }
);

const SenderPrivateMessages =
  models?.SenderPrivateMessages ||
  model("SenderPrivateMessages", SenderPrivateMessagesSchema);

export default SenderPrivateMessages;
