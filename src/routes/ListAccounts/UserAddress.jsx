import React from "react";
import { Link } from "react-router-dom";
import { getBalance } from "service";

export default function UserAddress({ dispatchWallet, userItem }) {
  const [balance, setBalance] = React.useState(0);
  const removeAdd = (e) => {
    e.preventDefault();
    dispatchWallet({ type: "REMOVE_IN_ACCOUNTS", payload: userItem.index });
    dispatchWallet({
      type: "MINUS_HEADER_PRICE",
      payload: { balance: userItem.balance },
    });
  };

  React.useEffect(() => {
    async function getBalanceMe() {
      let account = await getBalance(userItem.banAddress);
      setBalance(0 || account.balance);
      console.log(balance);
      if (parseFloat(account.balance) > 0) {
        dispatchWallet({
          type: "ADD_HEADER_PRICE",
          payload: { balance: account.balance },
        });
      }
    }

    getBalanceMe();
  }, [balance, dispatchWallet]);

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
        <span className='text-2xs md:text-xs'>{balance ? balance : 0} BAN</span>
        <span className='text-2xs block pl-2'> $ 0</span>
      </td>
    </tr>
  );
}
