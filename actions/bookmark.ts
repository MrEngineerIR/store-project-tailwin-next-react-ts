"use server";
import connectDB from "@/database/connectDB";
import { User } from "@/models/User";

const getUserBookmarks = async (email: string): Promise<string[] | null> => {
  await connectDB();
  const user: UserType | null = await User.findOne({ email });
  if (!user || !user?.bookmarks) return null;
  return user.bookmarks;
};

type HandleBookProductResult = {
  isBooked: boolean;
};

const HandleBookProduct = async (
  productId: string,
  email: string,
): Promise<HandleBookProductResult> => {
  await connectDB();

  // ✅ Add validation
  if (!email) {
    throw new Error("Email is required");
  }

  if (!productId) {
    throw new Error("Product ID is required");
  }

  try {
    const user = await User.findOne({ email: email });

    // ✅ CHECK IF USER EXISTS FIRST
    if (!user) {
      throw new Error("User not found");
    }

    // ✅ Ensure bookmarks array exists (optional but safe)
    if (!user.bookmarks) {
      user.bookmarks = [];
    }

    // Now safely access user.bookmarks
    if (user.bookmarks.some((item: string) => item === productId)) {
      const newBookmarks: string[] = user.bookmarks.filter(
        (item: string) => item !== productId,
      );
      await User.findOneAndUpdate(
        { email: email },
        { $set: { bookmarks: newBookmarks } },
      );
      return { isBooked: false };
    }

    const newBookmarks: string[] = [...user.bookmarks, productId];
    await User.findOneAndUpdate(
      { email: email },
      { $set: { bookmarks: newBookmarks } },
    );
    return { isBooked: true };
  } catch (error: any) {
    console.error("HandleBookProduct error:", error);
    throw new Error(error.message || "Failed to update bookmarks");
  }
};

export { getUserBookmarks, HandleBookProduct };
