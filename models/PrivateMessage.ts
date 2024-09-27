import { models, Schema, model } from "mongoose";

export const PrivateMessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PrivateMessage =
  models?.PrivateMessage || model("PrivateMessage", PrivateMessageSchema);

export default PrivateMessage;
