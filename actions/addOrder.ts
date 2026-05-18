"use server";

import connectDB from "@/database/connectDB";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";

const addOrder = async (newOrder: orderType) => {
  await connectDB(); // ← Fix: add parentheses! connectDB is a function
  const date = new Date();
  newOrder.createdAt = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;
  const user: UserType | null = await User.findById(newOrder.userId);
  if (user?.orders?.some((order) => order.productId === newOrder.productId)) {
    return undefined;
  }

  await User.findOneAndUpdate(
    { _id: newOrder.userId },
    { $set: { orders: [...user!.orders!, newOrder] } },
  );

  const newOrderDb = new Order({
    userId: newOrder.userId,
    productId: newOrder.productId,
    productName: newOrder.productName,
    quantity: newOrder.quantity,
    price: newOrder.price,
    isPaid: false,
  });

  const savedOrder = await newOrderDb.save();

  // ✅ Return a plain object, not the Mongoose document
  return {
    _id: savedOrder._id.toString(),
    userId: savedOrder.userId,
    productId: savedOrder.productId,
    productName: savedOrder.productName,
    quantity: savedOrder.quantity,
    price: savedOrder.price,
    isPaid: savedOrder.isPaid,
    createdAt: savedOrder.createdAt,
  };
};

export default addOrder;
