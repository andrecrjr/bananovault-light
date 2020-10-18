import React, { useEffect } from "react";
import { WalletContext } from "../../context";
import Layout from "../../components/Layout";
import UserAddress from "./UserAddress";
import { Link } from "react-router-dom";

import { getBanAddress } from "service";

export default function ListAccounts() {
  const { state, dispatchWallet, password } = React.useContext(WalletContext);
  const createAdd = async (e, index) => {
    e.preventDefault();
    if (password.pass.length > 0) {
      let data = await getBanAddress(
        state.seed,
        password.pass,
        state.accounts.length
      );
      dispatchWallet({
        type: "CREATE_NEW_ACCOUNT",
        payload: data,
      });
    }
  };
  return (
    <>
      <Layout>
        <h1 className='structure--title'>Your Accounts</h1>
        {state ? (
          <section className='structure pt-5'>
            <button
              className='w-7/12 md:w-4/12 block ml-auto mr-3 mb-3 text-2xs button--main'
              onClick={(e) => createAdd(e)}
            >
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
                {state.accounts.length > 0 &&
                  state.accounts.map((userItem, index) => (
                    <UserAddress
                      userItem={userItem}
                      dispatchWallet={dispatchWallet}
                      password={password}
                    />
                  ))}
              </tbody>
            </table>
            {state.accounts.length === 0 && (
              <p class='text-white text-center py-4'>
                No Banano Address here, just tap the New Create Account button!
              </p>
            )}
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
