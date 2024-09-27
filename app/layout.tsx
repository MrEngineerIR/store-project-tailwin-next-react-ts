"use client";
import React from "react";
import "./globals.css";
import { NotificationContextProvider } from "@/components/notification-context/NotificationProvider";
import Notification from "@/components/utils/Notification";
import { Provider } from "react-redux";
import { store } from "@/store/dashboard/dashboardStore";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className="font-tanha" dir="rtl">
      <body id="body">
        <NotificationContextProvider>
          <Provider store={store}>{children}</Provider>
          <Notification />
        </NotificationContextProvider>
        <div id="how"></div>
      </body>
    </html>
  );
};

export default layout;
