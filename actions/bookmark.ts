"use server";
import connectDB from "@/database/connectDB";
import { User } from "@/models/User";

const getUserBookmarks = async (email: string) => {
  await connectDB();
  const user = await User.findOne({ email: email });
  if (user.bookmarks) {
    return user.bookmarks;
  }
  return undefined;
};
const unBookProduct = async (productId: string, email: string) => {
  await connectDB();

  try {
    const user = await User.findOne({ email: email });
    const newBookmarks: string[] = user.bookmarks.filter(
      (item: string) => item !== productId
    );
    await User.findOneAndUpdate(
      { email: email },
      { $set: { bookmarks: newBookmarks } }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const BookProduct = async (productId: string, email: string) => {
  await connectDB();
  try {
    const user = await User.findOne({ email: email });
    if (user.bookmarks.some((item: string) => item === productId)) {
      return;
    }
    const newBookmarks: string[] = [...user.bookmarks, productId];
    await User.findOneAndUpdate(
      { email: email },
      { $set: { bookmarks: newBookmarks } }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getUserBookmarks, BookProduct, unBookProduct };
