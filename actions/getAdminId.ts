"use server";

import connectDB from "@/database/connectDB";
import { User } from "@/models/User";

const getAdminId = async () => {
  await connectDB();
  const admin: UserType | null = await User.findOne({ isAdmin: true });
  if (!admin) return undefined;
  return admin._id.toString();
};
export default getAdminId;
