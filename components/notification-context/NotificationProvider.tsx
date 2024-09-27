"use client";
import React, { createContext, useState } from "react";

export type notificationType = {
  message: string;
  state: notificationStateEnum;
};

export enum notificationStateEnum {
  success,
  faild,
  pending,
  null,
}
export type notificationContextType = {
  message: string;
  state: notificationStateEnum;
  setNotificationState: Function;
};
const NotificationContext = createContext<notificationContextType>({
  message: "در حال انجام",
  state: notificationStateEnum.null,
  setNotificationState: ({
    message,
    state,
  }: {
    message: string;
    state: notificationStateEnum;
  }) => {},
});

const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notificationState, setNotificationState] = useState<notificationType>({
    message: "",
    state: notificationStateEnum.null,
  });
  function handleNotifState({
    message,
    state,
  }: {
    message: string;
    state: notificationStateEnum;
  }) {
    setNotificationState({ message: "", state: notificationStateEnum.null });
    setNotificationState({ message: message, state: state });
  }
  const ctxValue: notificationContextType = {
    message: notificationState.message,
    state: notificationState.state,
    setNotificationState: handleNotifState,
  };
  return (
    <NotificationContext.Provider value={ctxValue}>
      {children}
    </NotificationContext.Provider>
  );
};
export { NotificationContext, NotificationContextProvider };
