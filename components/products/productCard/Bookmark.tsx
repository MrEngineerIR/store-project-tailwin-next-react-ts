"use client";
import { BiBookmark, BiBookmarkPlus } from "react-icons/bi";
import {
  BookProduct,
  getUserBookmarks,
  unBookProduct,
} from "@/actions/bookmark";
import { getUser } from "@/actions/authenicate";
import { useContext, useEffect, useState } from "react";
import {
  NotificationContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";
import { useRouter } from "next/navigation";
import revalidatePath from "@/actions/revalidatePath";

const Bookmark = ({ productId }: { productId: string }) => {
  const [isBooked, setIsBooked] = useState<boolean>();
  const notificationContext = useContext(NotificationContext);
  const router = useRouter();
  useEffect(() => {
    async function checkBookmark() {
      const user = await getUser();
      if (!user) {
        setIsBooked(false);
        return;
      }
      const res: string[] = await getUserBookmarks(user.email);
      if (res) {
        const isBooked = res.some((item) => item === productId);
        setIsBooked(isBooked);
      }
    }
    checkBookmark();
  }, []);

  async function handleBookmarkClick() {
    const user = await getUser();
    if (!user) {
      notificationContext.setNotificationState({
        message: "ابتدا وارد حساب کاربری شوید",
        state: notificationStateEnum.faild,
      });
      return;
    }
    if (isBooked) {
      setIsBooked(false);
      await unBookProduct(productId, user.email);
      revalidatePath("/account");
      return;
    }
    setIsBooked(true);
    await BookProduct(productId, user?.email);
    revalidatePath("/account");
  }
  return (
    <button
      onClick={handleBookmarkClick}
      className="hover:bg-white/10 h-full rounded-l-full items-center w-full flex justify-center"
    >
      {isBooked ? (
        <BiBookmarkPlus onClick={handleBookmarkClick} />
      ) : (
        <BiBookmark onClick={handleBookmarkClick} />
      )}
    </button>
  );
};

export default Bookmark;
