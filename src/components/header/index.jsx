import React from "react";

function Header() {
  return (
    <header className="w-full h-full shadow-xl p-4 text-white">
      <div className="flex flex-col h-full px-4 md:flex-row sm:mx-auto justify-center items-center">
          <div className="md:absolute md:left-0 md:pl-20">[BananoVault]</div>
          <div className="font-bold">0 BAN</div>
          <ul className="list-none inline-flex text-sm md:absolute md:right-0 md:pr-10">
            <li className="header__menu--item sm:pt-0">Account</li>
            <li className="header__menu--item  sm:pt-0">Send</li>
            <li className="header__menu--item  sm:pt-0">Address Book</li>
            <li className="header__menu--item  sm:pt-0">Settings</li>
          </ul>
      </div>
    </header>
  );
}

export default Header;
