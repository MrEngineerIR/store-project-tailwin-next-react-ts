"use client";

import { SyncLoader } from "react-spinners";
const Loading = () => {
  return (
    <p className="flex justify-center mt-[50vh]">
      <SyncLoader className="text-green-500" />
    </p>
  );
};
export default Loading;
