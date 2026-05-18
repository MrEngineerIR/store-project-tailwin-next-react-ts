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
      <div className="grid grid-cols-1 md:grid-cols-2 m-2 gap-x-2  relative">
        {/* Back button */}
        <div className="col-span-1 md:col-span-2 mb-4">
          <Link
            href="/"
            className="inline-block bg-sky-700 hover:bg-black/30 rounded p-2 text-white"
          >
            بازگشت
          </Link>
        </div>

        {/* Account Info Section */}
        <section className="rounded">
          <AccountInfo />
        </section>

        {/* Orders Info Section */}
        <section className="rounded">
          <OrdersInfo />
        </section>
      </div>

      <hr className="w-full " />
      <h1 className="text-center mb-2 mt-2">نشان شده ها</h1>
      <div className="m-5 flex flex-wrap gap-5 justify-center">
        {bookmarks.length > 0 ? (
          products.map((item: productType) => {
            const plainItem = JSON.parse(JSON.stringify(item));
            const madeDate =
              item.madeDate instanceof Date &&
              item.madeDate.getFullYear().toString();

            return (
              <ProductCard
                key={item.color + item.price + Math.random()}
                product={{ ...plainItem, madeDate }}
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
