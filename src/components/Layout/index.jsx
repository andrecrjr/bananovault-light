import React from "react";
import Header from "../header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-10 w-full sm:w-8/12 sm:m-auto">{children}</main>
    </>
  );
}

export default Layout;
