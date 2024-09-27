import React, { Fragment } from "react";

import { Order } from "@/models/Order";

const Orders = async () => {
  const allOrders: orderType[] = await Order.find({});
  if (!allOrders || allOrders.length < 1) {
    return (
      <>
        <p>هنوز سفارشی نداریم...</p>
        <p>برای تست کردن سفارش میتوانید با حساب ادمین سفارش سوری ثبت کنید</p>
      </>
    );
  }
  return (
    <div className="flex justify-center items-center w-full mt-10">
      <section className="w-full">
        {allOrders.map((order) => {
          return (
            <Fragment key={order.productId}>
              <table className="hidden sm:table flex-wrap text-center border-collapse border-2 mb-10 w-[80%] mx-auto">
                <thead>
                  <tr>
                    <td className="border-2 border-white">شناسه کاربر</td>
                    <td className="border-2 border-white">شناسه محصول</td>
                    <td className="border-2 border-white">نام محصول</td>
                    <td className="border-2 border-white">تعداد</td>
                    <td className="border-2 border-white">پرداخت شده</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-white p-1 ">
                      {order.userId}
                    </td>
                    <td className="border-2 border-white p-1 ">
                      {order.productId}
                    </td>
                    <td className="border-2 border-white p-1 ">
                      {order.productName}
                    </td>
                    <td className="border-2 border-white p-1 ">
                      {order.quantity}
                    </td>
                    <td className="border-2 border-white p-1 ">
                      {order.isPaid ? "بله" : "خیر"}
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* table for mobile mode */}
              <table
                key={order.productId}
                className=" sm:hidden flex-wrap text-center border-collapse border-2 mb-10 w-full"
              >
                <thead>
                  <tr>
                    <td className="border-2 border-white p-1">شناسه کاربر</td>
                    <td className="border-2 border-white p-1">
                      {order.userId}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-white p-1">شناسه محصول</td>
                    <td className="border-2 border-white p-1">
                      {order.productId}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-white p-1">نام محصول</td>
                    <td className="border-2 border-white p-1">
                      {order.productName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-white p-1">تعداد</td>
                    <td className="border-2 border-white p-1">
                      {order.quantity}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-white p-1">پرداخت شده</td>
                    <td className="border-2 border-white p-1">
                      {order.isPaid ? "بله" : "خیر"}
                    </td>
                  </tr>
                </thead>
              </table>
            </Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default Orders;
