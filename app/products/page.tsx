import ProductCard from "@/components/products/ProductCard";
import connectDB from "@/database/connectDB";
import Product from "@/models/Product";
import fs from "node:fs";

const page = async () => {
  await connectDB();
  const products = await Product.find({});
  if (products.length < 1) {
    return <p className="m-20 text-center">محصولی وجود ندارد...</p>;
  }

  return (
    <section className="flex w-full min-h-[500px] max-h-fit flex-wrap justify-center gap-x-5 gap-y-5 mt-40 p-5">
      {products.map((item: productServerType) => {
        // const image = fs.readFileSync(item.image);
        // const base64 = image.toString("base64");
        // const dataUri = `data:image/${
        //   item.image.split(".")[1]
        // };base64,${base64}`;

        const product: productType = {
          color: item.color,
          companyName: item.companyName,
          description: item.description,
          image: item.image,
          madeDate: item.madeDate.getFullYear().toString(),
          name: item.name,
          option: item.option,
          price: item.price,
          quantity: item.quantity,
          _id: item._id?.toString(),
          //creatAt
          //updateAt
        };
        return <ProductCard key={item._id} product={product} />;
      })}
    </section>
  );
};

export default page;
export type productServerType = {
  name: string;
  _id?: string;
  image: string;
  companyName: string;
  madeDate: Date;
  price: string;
  description: string;
  option: string[];
  color: string;
  quantity: number;
};
