import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className='absolute flex z-20 mt-3 mr-2 md:mt-0 right-0'>
      <label for='menu' className='top-0 z-20 right-0 lg:hidden'>
        Menu
      </label>
      <input type='checkbox' id='menu' className='hidden' />
      <ul
        className='flex w-2/5 md:w-1/5 flex-col list-none fixed top-0 right-0 bg-dark-gray 
      transform translate-x-full h-screen transition duration-500 z-10
      text-sm lg:w-auto lg:translate-x-0 lg:flex-row  lg:mt-5 lg:fixed lg:h-auto text-white lg:pr-10'
      >
        <li className='header__menu--item pt-20 lg:pt-0'>
          <Link to='/accounts'>Accounts</Link>
        </li>
        <li className='header__menu--item lg:pt-0'>
          <Link to='/send'>Send</Link>
        </li>
        <li className='header__menu--item  lg:pt-0'>Address Book</li>
        <li className='header__menu--item  lg:pt-0'>
          <Link to='/settings'>Settings</Link>
        </li>
      </ul>
    </div>
  );
}
