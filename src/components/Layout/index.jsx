import React from "react";

import Header from "../header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className='w-full mt-4 sm:mt-10 sm:mb-24'>{children}</main>
    </>
  );
}

export default Layout;
