"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  NotificationContext,
  notificationStateEnum,
  notificationType,
} from "../notification-context/NotificationProvider";

const Notification = () => {
  const notifContext = useContext(NotificationContext);
  const [notificationState, setNotificationState] =
    useState<notificationType>();
  useEffect(() => {
    setNotificationState(notifContext);
    const timer = setTimeout(() => {
      notifContext.setNotificationState({
        message: "",
        state: notificationStateEnum.null,
      });
      clearTimeout(timer);
    }, 3000);
  }, [notifContext.state]);
  return (
    <div
      onClick={() =>
        notifContext.setNotificationState({
          message: "",
          state: notificationStateEnum.null,
        })
      }
      className={`${
        notifContext.message.length > 0 ? undefined : "hidden"
      } fixed bottom-10 animate-popup right-10 w-fit p-2 rounded text-nowrap h-20 text-center flex items-center justify-center cursor-pointer ${
        notificationState?.state === notificationStateEnum.success
          ? "bg-green-700"
          : notificationState?.state === notificationStateEnum.faild
          ? "bg-red-700"
          : "bg-blue-500"
      } ${
        notificationState?.state === notificationStateEnum.null
          ? "hidden"
          : undefined
      }`}
    >
      <h1 className="text-xl">{notificationState?.message}</h1>
    </div>
  );
};

export default Notification;
