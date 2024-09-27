"use client";
import { FaShareNodes } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Bookmark from "./productCard/Bookmark";
import Purchase from "./productCard/Purchase";
import CardBody from "./productCard/CardBody";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import {
  NotificationContext,
  notificationStateEnum,
} from "../notification-context/NotificationProvider";

const ProductCard = ({ product }: { product: productType }) => {
  const pathName = usePathname();
  const notifContex = useContext(NotificationContext);
  async function handleShareClick() {
    await navigator.clipboard
      .writeText(`${window.location.origin}/products/${product._id}`)
      .then(() => {
        notifContex.setNotificationState({
          message: "آدرس در کلیپ بورد ذحیره شد",
          state: notificationStateEnum.success,
        });
      });
  }
  return (
    <div
      key={product._id! + Math.random()}
      className="w-[400px] bg-black/20 backdrop-blur-3xl rounded text-center p-4"
    >
      <CardBody product={product} />
      <section className="relative flex mt-5 bg-black/5 backdrop-blur-sm rounded-full h-10 justify-evenly items-center">
        <button
          onClick={handleShareClick}
          className="  hover:bg-white/10 h-full rounded-r-full items-center w-full flex justify-center"
        >
          <FaShareNodes />
        </button>
        <div className="mx-2 w-[1px] h-4 bg-white/30"></div>
        <Purchase product={product} />
        <div className="mx-2 w-[1px] h-4 bg-white/30"></div>
        <Bookmark productId={product._id!} />
      </section>
    </div>
  );
};

export default ProductCard;
