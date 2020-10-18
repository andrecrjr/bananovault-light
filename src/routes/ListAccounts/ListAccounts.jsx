import React, { useEffect } from "react";
import { WalletContext } from "../../context";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ListAccounts() {
  const { state, dispatchWallet } = React.useContext(WalletContext);
  const [accounts, setaAccounts] = useState([]);
  useEffect(() => {
    setaAccounts(state.accounts.filter((item) => !item.exclude));
  }, [state]);

  const removeAdd = (e, index) => {
    e.preventDefault()
    dispatchWallet({type:"UPDATE_WALLET", payload:index})
    
    console.log(accounts)
  }

  return (
    <>
      <Layout>
        <h1 className='structure--title'>Your Accounts</h1>
        {state ? (
          <section className='structure  pt-5'>
            <button className='w-7/12 md:w-4/12 block ml-auto mr-3 mb-3 text-2xs button--main'>
              Create New Account
            </button>
            <table class='table-auto rounded-lg'>
              <thead>
                <tr>
                  <td className='text-center text-white uppercase'></td>
                  <td className='text-center text-white uppercase'>Address</td>
                  <td className='text-right pr-3 text-white py-4 uppercase'>
                    Balance
                  </td>
                </tr>
              </thead>
              <tbody>
                {accounts.map((userItem, index) => (
                  <tr>
                    <td
                      className="text-white pl-2 cursor-pointer"
                      onClick={e=>removeAdd(e,index)}
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
                ))}
              </tbody>
            </table>
          </section>
        ) : (
          <section className='structure  pt-5'>
            <p className='text-center text-white'>
              First you'll need to create wallet, or import one:
            </p>
            <Link to={`/settings/wallet`} className='button--main mx-auto'>
              Give it a try
            </Link>
          </section>
        )}
      </Layout>
    </>
  );
}
