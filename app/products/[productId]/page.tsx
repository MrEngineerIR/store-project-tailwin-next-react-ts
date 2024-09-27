import React from "react";
import ProductCard from "@/components/products/ProductCard";
import Product from "@/models/Product";
import connectDB from "@/database/connectDB";


const page = async ({ params }: { params: any }) => {
  await connectDB();
  const product = await Product.findById(decodeURIComponent(params.productId));
  if (!product) {
    return <div>متاسفانه محصول مورد نظر پیدا نشد</div>;
  }
  const formattedProduct: productType = {
    color: product.color,
    companyName: product.companyName,
    description: product.description,
    image: product.image,
    madeDate: product.madeDate.getFullYear().toString(),
    name: product.name,
    option: product.option,
    price: product.price,
    quantity: product.quantity,
    _id: product.id,
    //creatAt
    //updateAt
  };
  return (
    <div className="flex justify-center m-10">
      <ProductCard product={formattedProduct} />
    </div>
  );
};

export default page;
