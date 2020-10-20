import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <label for='menu' className='absolute top-0 z-10 right-0 md:hidden'>
        Menu
      </label>
      <input type='checkbox' id='menu' className='hidden' />
      <ul
        className='flex w-2/5 md:w-auto flex-col list-none fixed top-0 right-0 bg-dark-gray 
      transform translate-x-full h-screen transition duration-500 z-10
      text-sm md:translate-x-0 md:flex-row  md:mt-5 md:fixed md:h-auto text-white md:pr-10'
      >
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
    </>
  );
}
