import React, { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<p>loading...</p>}>{children}</Suspense>;
};

export default layout;
