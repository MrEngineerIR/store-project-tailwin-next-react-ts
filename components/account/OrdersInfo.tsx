import { getUser } from "@/actions/authenicate";
import { User } from "@/models/User";
import React from "react";

const OrdersInfo = async () => {
  const user = await getUser();
  const userData: UserType | null = await User.findOne({ email: user?.email });
  if (!userData || userData!.orders!.length < 1) {
    return <p>هنوز سفارشی ندارید</p>;
  }
  return userData.orders!.map((order, key) => {
    console.log(order.createdAt);
    return (
      <div key={order.productId} className="relative mt-10">
        <h1 className="text-center absolute -top-[50px] right-[40%]">
          سفارشات
        </h1>
        <table className="border-2 w-full border-collapse my-20 flex-wrap text-center">
          <thead>
            <tr>
              <td className="border-white border-2 min-w-fit ">شماره</td>
              <td className="border-white border-2 ">تاریخ ثبت سفارش</td>
              <td className="border-white border-2 ">مشخصات</td>
              <td className="border-white border-2 ">تاریخ تحویل</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-white border-2 min-w-fit">{key}</td>
              <td className="border-white border-2">{order.createdAt}</td>
              <td className="border-white border-2">
                {order.productName}/{order.quantity}
              </td>
              <td className="border-white border-2">ارسال از 40 روز</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });
};

export default OrdersInfo;
