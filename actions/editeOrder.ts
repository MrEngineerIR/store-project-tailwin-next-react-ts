"use server";
import { User } from "@/models/User";
import getUserByEmail from "./getUserByEmail";
import { Order } from "@/models/Order";

const editOrder = async (
  email: string,
  productId: string,
  quantity: number
) => {
  const user: UserType | undefined = await getUserByEmail(email);
  const index = user?.orders?.findIndex(
    (order) => order.productId === productId
  );
  if (!user || index === -1) {
    return;
  }
  user!.orders![index!].quantity = quantity;
  await User.findOneAndReplace({ email: email }, user);
  const product: orderType | null = await Order.findOne({
    productId: productId,
  });
  product!.quantity = quantity;
  await Order.findOneAndReplace({ productId: productId }, product);
};

export default editOrder;
