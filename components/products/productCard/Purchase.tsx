"use client";
import addOrder from "@/actions/addOrder";
import {
  NotificationActionsContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";

const Purchase = ({ product }: { product: productType }) => {
  const [isAddingOrder, setIsAddingOrder] = useState<boolean>(false);
  const purchaseButtonRef = useRef<HTMLButtonElement>(null);
  const { setNotificationState } = useContext(NotificationActionsContext);
  const client = useQueryClient();
  const router = useRouter();

  function handlePurchaseClick() {
    setIsAddingOrder((prev) => !prev);
  }

  async function goToBasket() {
    await handleAddOrder();
    router.push("/card");
    router.refresh();
  }
  async function handleAddOrder() {
    setNotificationState({
      message: "در حال بررسی",
      state: notificationStateEnum.pending,
    });

    const userFromCache: UserType | undefined = client.getQueryData(["user"]);

    if (!userFromCache) {
      setNotificationState({
        message: "ابتدا وارد حساب کاربری شوید",
        state: notificationStateEnum.failed,
      });
      setIsAddingOrder(false);
      return;
    }

    // ✅ DON'T serialize the whole object
    // Just extract the values you need directly from the product prop

    const userOrders = userFromCache.orders || [];

    if (
      userOrders.some((order: orderType) => order.productId === product._id)
    ) {
      setNotificationState({
        message: "قبلا این کالا را انتخاب کرده‌اید به سبد سفارشات بروید",
        state: notificationStateEnum.failed,
      });
      setIsAddingOrder(false);
      return;
    }

    const newOrder = await addOrder({
      productId: product._id!,
      productName: product.name,
      quantity: 1,
      userId: userFromCache._id,
      price: product.price,
    });

    setNotificationState({
      message: "به سبد افزوده شد",
      state: notificationStateEnum.success,
    });

    setIsAddingOrder(false);
  }
  return (
    <>
      <button
        onBlur={() => setIsAddingOrder(false)}
        ref={purchaseButtonRef}
        onClick={() => {
          handlePurchaseClick();
        }}
        disabled={product.quantity <= 0}
        className=" disabled:cursor-not-allowed disabled:bg-black/10  hover:disabled:bg-white/5 hover:bg-white/10 h-full items-center w-full flex justify-center"
      >
        <CgShoppingCart />
        {isAddingOrder && (
          <span className=" absolute -top-[55px] min-w-96 ">
            <div className="grid grid-cols-2 bg-[rgb(4,45,69)] h-12 rounded-md ">
              <section
                className={
                  "w-full flex hover:bg-white/10 hover:rounded-md justify-between text-center"
                }
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddOrder();
                  }}
                  className="text-white rounded-l p-2 w-full grid place-items-center text-nowrap"
                >
                  افزودن به سبد و ادامه خرید
                </div>
              </section>
              <section
                className={
                  "w-full flex hover:bg-white/10 hover:rounded-md justify-between text-center"
                }
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    goToBasket();
                  }}
                  className="text-white rounded-l p-2 w-full grid place-items-center text-nowrap"
                >
                  تسویه و تکمیل خرید
                </div>
              </section>
            </div>
          </span>
        )}
      </button>
    </>
  );
};

export default Purchase;
