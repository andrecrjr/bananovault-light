import React from "react";

function Header() {
  return (
    <header className="flex flex-col justify-center shadow-xl items-center p-2 w-full h-full text-white sm:flex-row sm:justify-evenly sm:h-12">
      <div className="">[BananoVault]</div>
      <div className=" font-bold">0 BAN</div>
      <ul className="list-none inline-flex text-sm">
        <li className="header__menu--item sm:pt-0">Account</li>
        <li className="header__menu--item  sm:pt-0">Send</li>
        <li className="header__menu--item  sm:pt-0">Address Book</li>
        <li className="header__menu--item  sm:pt-0">Settings</li>
      </ul>
    </header>
  );
}

export default Header;
