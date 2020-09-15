import React from "react";
import Header from "../header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="w-full">{children}</main>
    </>
  );
}

export default Layout;
