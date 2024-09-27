"use client";
import React from "react";

const error = ({ error }: { error: any }) => {
  return (
    <div className="fixed top-1/2 left-[40%]">
      {error.message}
      <button
        onClick={() => window.location.reload()}
        className="bg-rounded bg-white/10 p-2 rounded block mx-auto"
      >
        بازگشت
      </button>
    </div>
  );
};

export default error;
