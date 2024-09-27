"use server";
import { User } from "@/models/User";
import { Order } from "@/models/Order";
import connectDB from "@/database/connectDB";

const deleteOrder = async (userId: string, productId: string) => {
  await connectDB();
  await Order.findOneAndDelete({
    productId: productId,
  });
  const user: UserType | null = await User.findById(userId);
  const index = user?.orders?.findIndex(
    (order) => order.productId === productId
  );
  if (!user || index === -1) {
    return;
  }
  const orders = user.orders;
  orders!.splice(index!, 1);

  await User.findOneAndUpdate({ _id: userId }, { orders: orders });
};

export default deleteOrder;
