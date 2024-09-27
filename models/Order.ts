import { models, model, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = models?.Order || model("Order", OrderSchema);
export { Order };
