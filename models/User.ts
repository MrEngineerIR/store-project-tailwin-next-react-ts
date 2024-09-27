import { models, model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    bookmarks: {
      type: [],
    },
    orders: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);
export { User };
