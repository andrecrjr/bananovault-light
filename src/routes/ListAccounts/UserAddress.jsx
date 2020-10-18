import React from "react";
import { Link } from "react-router-dom";

export default function UserAddress({ dispatchWallet, userItem }) {
  const removeAdd = (e, index) => {
    e.preventDefault();
    dispatchWallet({ type: "REMOVE_IN_ACCOUNTS", payload: index });
  };

  return (
    <tr>
      <td
        className='text-white pl-2 cursor-pointer'
        onClick={(e) => removeAdd(e, userItem.index)}
      >
        X
      </td>
      <td className='table-child px-3 w-55% sm:w-8/12 text-xs md:text-sm text-white relative'>
        <Link to={`/account/${userItem.banAddress}`}>
          {userItem.banAddress}
        </Link>
      </td>
      <td className='table-child--left text-2xs md:text-sm pr-4 text-white text-right'>
        <span className='text-2xs md:text-xs'> 0 BAN</span>
        <span className='text-2xs block pl-2'> $ 0</span>
      </td>
    </tr>
  );
}
