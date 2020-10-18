import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <ul className='list-none inline-flex text-sm md:absolute md:right-0 md:pr-10'>
      <li className='header__menu--item sm:pt-0'>
        <Link to='/accounts'>Accounts</Link>
      </li>
      <li className='header__menu--item  sm:pt-0'>
        <Link to='/send'>Send</Link>
      </li>
      <li className='header__menu--item  sm:pt-0'>Address Book</li>
      <li className='header__menu--item  sm:pt-0'>
        <Link to='/settings'>Settings</Link>
      </li>
    </ul>
  );
}
