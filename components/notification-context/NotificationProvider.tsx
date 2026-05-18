"use client";
import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";

export type notificationType = {
  message: string;
  state: notificationStateEnum;
};

export enum notificationStateEnum {
  success = 0,
  failed = 1,
  pending = 2,
  null = 3,
}

export type NotificationDisplayContextType = {
  message: string;
  state: notificationStateEnum;
};

export type NotificationActionsContextType = {
  setNotificationState: (params: {
    message: string;
    state: notificationStateEnum;
  }) => void;
};

const initialDisplayValue: NotificationDisplayContextType = {
  message: "",
  state: notificationStateEnum.null,
};

export const NotificationDisplayContext =
  createContext<NotificationDisplayContextType>(initialDisplayValue);

export const NotificationActionsContext =
  createContext<NotificationActionsContextType>({
    setNotificationState: () => {},
  });

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notificationState, setNotificationState] = useState<notificationType>({
    message: "",
    state: notificationStateEnum.null,
  });
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const setNotification = useCallback(
    ({ message, state }: { message: string; state: notificationStateEnum }) => {
      // Clear previous timeout
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }

      // Set new notification
      setNotificationState({ message, state });

      // Auto clear after 3 seconds
      if (state !== notificationStateEnum.null && message) {
        timerIdRef.current = setTimeout(() => {
          setNotificationState({
            message: "",
            state: notificationStateEnum.null,
          });
          timerIdRef.current = null;
        }, 3000);
      }
    },
    [],
  );

  const displayValue = useMemo(
    () => ({
      message: notificationState.message,
      state: notificationState.state,
    }),
    [notificationState.message, notificationState.state],
  );

  const actionsValue = useMemo(
    () => ({
      setNotificationState: setNotification,
    }),
    [setNotification],
  );

  return (
    <NotificationDisplayContext.Provider value={displayValue}>
      <NotificationActionsContext.Provider value={actionsValue}>
        {children}
      </NotificationActionsContext.Provider>
    </NotificationDisplayContext.Provider>
  );
};
