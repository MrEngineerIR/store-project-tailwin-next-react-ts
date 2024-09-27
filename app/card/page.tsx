import { getUser } from "@/actions/authenicate";
import getOrder from "@/actions/getOrder";
import { redirect } from "next/navigation";
import CardOrder from "@/components/card/CardOrder";
import { BiSmile } from "react-icons/bi";

const page = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const orders: orderType[] | undefined = await getOrder(user.email);
  const allPrice: number[] | undefined = orders?.map((item) => {
    return item.quantity * parseFloat(item.price);
  });
  const totalPrice = allPrice?.reduce(
    (total, price): number => total + price,
    0
  );

  return orders ? (
    <div className="bg-white/10 w-[80%] mx-auto pt-5 mt-5 pb-1">
      <div className="flex justify-center items-center gap-5 flex-wrap text-center mt-10">
        {orders.map((order) => {
          return (
            <CardOrder key={order.productId + Math.random()} order={order} />
          );
        })}
      </div>
      <section className="flex justify-center my-20 rounded h-14">
        <div className="w-fit bg-white/10 text-nowrap content-center rounded-r-lg p-1 ">
          <p>{totalPrice}$</p>
        </div>
        <button className="hover:bg-green-700 bg-green-600 rounded-l-lg text-center p-2 ">
          پرداخت
        </button>
      </section>
      <p className="text-center">
        این پروژه یک نمونه کار است در کسب و کار واقعی پس از کلیک بر روی پرداخت
        به درگاه پرداخت هدایت می‌شوید
      </p>
    </div>
  ) : (
    <p className="flex justify-center text-center my-40 items-center">
      هنوز سفارشی برای نهایی کردن ندارید
      <BiSmile />
    </p>
  );
};

export default page;
