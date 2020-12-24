import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Paste } from "assets/paste.svg";

export default function UserAddress({
  dispatchWallet,
  userAddress,
  userBalance,
}) {
  const textAreaRef = useRef(null);

  const removeAdd = (e) => {
    e.preventDefault();
    dispatchWallet({ type: "REMOVE_IN_ACCOUNTS", payload: userAddress.index });
  };

  const copyMe = (e) => {
    navigator.clipboard.writeText(textAreaRef.current.textContent);
    /* Alert the copied text */
  };
  return (
    <tr key={userAddress.index}>
      <td className={`text-white pl-2 cursor-pointer`}>
        <Paste
          onClick={copyMe}
          width='20'
          height='20'
          style={{ fill: "white" }}
        />
      </td>
      <td
        className='table-child px-3 pr-1 w-55% sm:w-8/12 text-xs md:text-sm text-white relative'
        ref={textAreaRef}
      >
        <Link to={`/account/${userAddress.banAddress}`}>
          {userAddress.banAddress}
        </Link>
      </td>
      <td className='table-child--left text-2xs md:text-sm pr-4 text-white text-right'>
        <span className='text-2xs md:text-xs'>
          <span className='balance--bal'>
            {userBalance.length !== 0 ? userBalance[0].balance : 0}
          </span>{" "}
          BAN
        </span>
        <span className='text-2xs block pl-2'> $ 0</span>
      </td>
      <td className={`text-white pl-2 cursor-pointer`}>
        <span onClick={(e) => removeAdd(e, userAddress.index)}> X</span>
      </td>
    </tr>
  );
}
