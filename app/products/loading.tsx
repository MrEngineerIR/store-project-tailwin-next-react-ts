"use client";
import React from "react";
import { RingLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <RingLoader color="white" />
    </div>
  );
};

export default Loading;
