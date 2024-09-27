"use server";

import connectDB, { client } from "@/database/connectDB";
import hashPassword from "@/lib/pasword";
import { User } from "@/models/User";

export default async function signup(
  formData: FormData
): Promise<actionsResponse> {
  const response: actionsResponse = {
    ok: false,
    message: "مشکلی پیش آمد",
  };
  const email = formData.get("email");
  const pass = formData.get("password") as string;
  if (!email || !pass) {
    response.message = "ایمیل یا پسورد معتبر وارد کنید";
    return response;
  }
  const hashedPassword = await hashPassword(pass);
  await connectDB();
  const isUserExist = await User.findOne({ email: email });
  if (isUserExist) {
    response.message = "با این ایمیل اکانت دیگری وجود دارد";
    return response;
  }
  const newUser = new User({
    email: email,
    password: hashedPassword,
    isAdmin: false,
  });
  const res = await newUser.save();
  if (!res) {
    throw new Error(
      "حساب کاربری ایجاد نشد لطفا ایمیل خود را بررسی کنید یا بعدا تلاش کنید"
    );
  }
  response.ok = true;
  response.message = "موفقیت آمیز";
  response.user = {
    email: res.email,
  };
  return response;
}
