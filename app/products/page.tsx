import ProductCard from "@/components/products/ProductCard";
import connectDB from "@/database/connectDB";
import Product, { productServerType } from "@/models/Product";

const page = async () => {
  await connectDB();
  const products: productType[] = await Product.find({});

  if (products.length < 1) {
    return <p className="m-20 text-center">محصولی وجود ندارد...</p>;
  }

  return (
    <section className="flex w-full min-h-[500px] max-h-fit flex-wrap justify-center gap-x-5 gap-y-5 mt-10 p-5">
      {products.map((item: productType) => {
        const plainItem = JSON.parse(JSON.stringify(item));
        return (
          <ProductCard
            key={item._id}
            product={{
              ...plainItem,
              madeDate: new Date(plainItem.madeDate).getFullYear().toString(),
            }}
          />
        );
      })}
    </section>
  );
};

export default page;
