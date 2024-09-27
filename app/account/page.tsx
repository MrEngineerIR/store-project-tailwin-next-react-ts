import { getUser } from "@/actions/authenicate";
import AccountInfo from "@/components/account/AccountInfo";
import OrdersInfo from "@/components/account/OrdersInfo";
import ProductCard from "@/components/products/ProductCard";
import { User } from "@/models/User";
import Link from "next/link";
import React from "react";
import connectDB from "@/database/connectDB";
import Product from "@/models/Product";

const page = async () => {
  await connectDB();
  const user = await getUser();
  const userData = await User.findOne({ email: user?.email });
  const bookmarks: string[] = userData?.bookmarks || [];
  const products: productType[] = [];
  for (const element of bookmarks) {
    const product = await Product.findById(element);
    products.push(product);
  }

  return (
    <>
      <div className="block md:flex relative items-center justify-evenly min-h-screen max-h-fit ">
        <section className="m-10 absolute top-1 right-1 bg-sky-700 rounded hover:bg-black/30 w-fit p-1 ">
          <Link href={"/"}>بازگشت</Link>
        </section>
        <section className="bg-white/5 rounded ">
          <AccountInfo />
        </section>
        <section className="bg-white/5 rounded p-2 h-min-[300px]">
          <OrdersInfo />
        </section>
      </div>
      <hr className="w-full " />
      <h1 className="text-center mb-20 mt-2">نشان شده ها</h1>
      <div className="m-5 flex flex-wrap gap-5 justify-center">
        {bookmarks.length > 0 ? (
          products.map((item: productType) => {
            const formattedItem: productType = {
              color: item.color,
              companyName: item.companyName,
              description: item.description,
              image: item.image,
              madeDate:
                item.madeDate instanceof Date
                  ? item.madeDate.getFullYear().toString()
                  : item.madeDate,
              name: item.name,
              option: item.option,
              price: item.price,
              quantity: item.quantity,
              _id: item._id,
            };
            return (
              <ProductCard
                key={item.color + item.price + Math.random()}
                product={formattedItem}
              />
            );
          })
        ) : (
          <p>محصول نشان کرده‌ای ندارید</p>
        )}
      </div>
    </>
  );
};

export default page;
