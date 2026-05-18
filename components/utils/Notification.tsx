"use client";
import React, { useContext } from "react";
import {
  NotificationDisplayContext,
  notificationStateEnum,
} from "@/components/notification-context/NotificationProvider";

const NotificationToast = () => {
  const { message, state } = useContext(NotificationDisplayContext);

  if (!message || state === notificationStateEnum.null) {
    return null;
  }

  const bgColor =
    state === notificationStateEnum.success
      ? "bg-green-500"
      : state === notificationStateEnum.failed
        ? "bg-red-500"
        : "bg-yellow-500";

  const icon =
    state === notificationStateEnum.success
      ? "✓"
      : state === notificationStateEnum.failed
        ? "✗"
        : "⏳";

  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[250px] animate-in slide-in-from-top-2 fade-in duration-300`}
      >
        <span className="text-xl font-bold">{icon}</span>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default NotificationToast;
