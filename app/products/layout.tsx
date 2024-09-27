import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React, { Suspense } from "react";
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
