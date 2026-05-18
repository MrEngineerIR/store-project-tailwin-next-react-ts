import { AuthUserType, getUser } from "@/actions/authenicate";
import { getUserBookmarks, HandleBookProduct } from "@/actions/bookmark";
import {
  NotificationActionsContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";
import { RootState } from "@/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useSelector } from "react-redux";
type UseBookmarksType = {
  productId: string;
};

export const useBookmarks = ({ productId }: UseBookmarksType) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const { setNotificationState } = useContext(NotificationActionsContext);
  const queryClient = useQueryClient();

  // Get fresh user data from React Query with email
  const { data: authUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (reduxUser?.email) return reduxUser;
      return await getUser();
    },
    enabled: !!reduxUser?.email,
  });

  // Use the authenticated user (prefer the one from React Query)
  const currentUser = authUser || reduxUser;

  const {
    data: bookmarks,
    isLoading: isLoadingQuery,
    isError: isErrorQuery,
  } = useQuery({
    queryKey: ["bookmarks", currentUser?.email],
    queryFn: async () => {
      if (!currentUser?.email) return null;
      try {
        return await getUserBookmarks(currentUser.email);
      } catch (err) {
        console.error("Query error:", err);
        throw err;
      }
    },
    enabled: !!currentUser?.email, // Only run if we have email
  });

  const {
    isError: isErrorMutate,
    isPending,
    mutateAsync,
  } = useMutation({
    mutationFn: async () => {
      // ✅ Get the most up-to-date user from React Query cache
      const userFromCache: UserType | undefined =
        await queryClient.getQueryData(["user"]);
      const userEmail = userFromCache?.email || currentUser?.email;

      if (!userEmail) {
        throw new Error("Email is required - please login");
      }

      await HandleBookProduct(productId, userEmail);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      setNotificationState({
        message: "با موفقیت انجام شد",
        state: notificationStateEnum.success,
      });
    },
    onError: (error: Error) => {
      console.error("Mutation error:", error);
      setNotificationState({
        message: error.message || "خطا در نشان کردن محصول",
        state: notificationStateEnum.failed,
      });
    },
  });

  async function handleBookmarkClick() {
    // ✅ Check for email first
    const userFromCache: UserType | undefined = await queryClient.getQueryData([
      "user",
    ]);
    const userEmail = userFromCache?.email || currentUser?.email;

    if (!userEmail) {
      setNotificationState({
        message: "ابتدا وارد حساب کاربری شوید",
        state: notificationStateEnum.failed,
      });
      return;
    }

    try {
      await mutateAsync();
    } catch (error) {
      // Error is handled in onError
      console.error("Bookmark click error:", error);
    }
  }

  return {
    bookmarks,
    isErrorMutate,
    isErrorQuery,
    isPending,
    isLoadingQuery,
    handleBookmarkClick,
  };
};
