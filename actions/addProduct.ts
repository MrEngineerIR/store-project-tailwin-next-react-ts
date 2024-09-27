"use server";
import connectDB from "@/database/connectDB";
import Product from "@/models/Product";
import path from "path";
import fs from "node:fs";
import { fileTypeFromBuffer } from "file-type";
import { UUID } from "mongodb";
import { revalidatePath } from "next/cache";

const addProduct = async (
  product: productType,
  urlData: string,
  base64ImageString: string
): Promise<actionsResponse> => {
  //TODO check if we have a product similar in db
  const response: actionsResponse = { message: "", ok: true };
  const haveProduct = await Product.findOne({
    name: product.name,
  });
  if (haveProduct) {
    response.message = "قبلا محصولی با این نام را اضافه کرده‌اید";
    response.ok = false;
    return response;
  }
  const buffer = Buffer.from(base64ImageString, "base64");
  const fileType = await fileTypeFromBuffer(buffer);
  if (!(fileType?.ext === "png" || fileType?.ext === "jpg")) {
    response.message = "فرمت تصویر باید jpg یا png باشد";
    response.ok = false;
    return response;
  }
  //const dataUri = `data:image/${fileType.ext};base64,${base64ImageString}`;
  //   function generateUniqueFilename(directory: string, extension = ".png") {
  //     const timestamp = Date.now();
  //     const uniqueId = new UUID().toString();
  //     return path.join(directory, `${timestamp}-${uniqueId}${extension}`);
  //   }

  //   const uniqfileName = generateUniqueFilename(
  //     path.join(process.cwd(), "ProductImages"),
  //     `.${fileType?.ext}`
  //   );
  //fs.writeFileSync(uniqfileName, buffer);
  await connectDB();
  const newProduct = new Product({
    name: product.name,
    image: urlData,
    companyName: product.companyName,
    madeDate: product.madeDate,
    price: product.price,
    description: product.description,
    option: product.option,
    color: product.color,
    quantity: product.quantity,
  });

  await newProduct.save();
  revalidatePath("/", "layout");
  response.message = "محصول اضافه شد";
  response.ok = true;
  return response;
};

export default addProduct;
