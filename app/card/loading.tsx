"use client";
import { BarLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <BarLoader />
    </div>
  );
};

export default Loading;
