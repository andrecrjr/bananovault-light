import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { getBalance } from "service";
import { ReactComponent as Paste } from "assets/paste.svg";

export default function UserAddress({ dispatchWallet, userItem }) {
  const textAreaRef = useRef(null);

  const [balance, setBalance] = React.useState(0);
  const removeAdd = (e) => {
    e.preventDefault();
    dispatchWallet({ type: "REMOVE_IN_ACCOUNTS", payload: userItem.index });
  };

  React.useEffect(() => {
    async function getBalanceMe() {
      try {
        let account = await getBalance(userItem.banAddress);
        setBalance(0 || account.balance);
      } catch (error) {
        console.log(error);
      }
    }

    getBalanceMe();
  }, [balance, dispatchWallet, userItem.balance, userItem.banAddress]);

  React.useEffect(() => {
    dispatchWallet({
      type: "UPDATE_ACCOUNT",
      payload: { banAmount: balance, index: parseFloat(userItem.index) },
    });
  }, [balance, dispatchWallet, userItem.index]);
  const copyMe = (e) => {
    navigator.clipboard.writeText(textAreaRef.current.textContent);
    /* Alert the copied text */
  };
  return (
    <tr key={userItem.index}>
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
        <Link to={`/account/${userItem.banAddress}`}>
          {userItem.banAddress}
        </Link>
      </td>
      <td className='table-child--left text-2xs md:text-sm pr-4 text-white text-right'>
        <span className='text-2xs md:text-xs'>
          <span className='balance--bal'>{balance ? balance : 0}</span> BAN
        </span>
        <span className='text-2xs block pl-2'> $ 0</span>
      </td>
      <td className={`text-white pl-2 cursor-pointer`}>
        <span onClick={(e) => removeAdd(e, userItem.index)}> X</span>
      </td>
    </tr>
  );
}
