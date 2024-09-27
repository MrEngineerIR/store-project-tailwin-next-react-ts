"use server";

import connectDB, { client } from "@/database/connectDB";
import hashPassword from "@/lib/pasword";
import { User } from "@/models/User";

export default async function signin(
  formData: FormData
): Promise<actionsResponse> {
  const response: actionsResponse = {
    ok: false,
    message: "مشکلی پیش آمد",
  };
  const email = formData.get("email") as string;
  const pass = formData.get("password") as string;
  if (!email || !pass) {
    response.message = "ایمیل یا پسورد معتبر وارد کنید";
    return response;
  }
  const hashedPassword = await hashPassword(pass);
  await connectDB();
  const user = await User.findOne({ email: email });
  if (user && user.password === hashedPassword) {
    response.ok = true;
    response.message = "با موفقیت وارد شدید";
    response.user = { email: user.email };
    return response;
  }
  response.message = "چنین کاربری وجود ندارد یا رمز اشتباه است";
  return response;
}
