import connectDB from "@/database/connectDB";
import { User } from "@/models/User";

const getOrder = async (email: string) => {
  await connectDB();
  const user: UserType | null = await User.findOne({ email: email });
  if (!user || user?.orders!.length < 1) {
    return undefined;
  }

  return user?.orders;
};

export default getOrder;
