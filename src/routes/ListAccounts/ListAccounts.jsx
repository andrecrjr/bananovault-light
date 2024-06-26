import React from "react";
import { WalletContext } from "../../context";
import Layout from "../../components/Layout";
import UserAddress from "./UserAddress";
import { Link } from "react-router-dom";

import { getBanAddress } from "service";

export default function ListAccounts() {
  const { state, dispatchWallet, password, balances } = React.useContext(
    WalletContext
  );

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
        payload: { ...data, show: true },
      });
    }
  };
  return (
    <>
      <Layout>
        <h1 className='structure--title mt-2'>Your Accounts</h1>
        {state.seed !== "" ? (
          <section className='structure pt-5'>
            <button
              className='block ml-auto mr-2 mb-3 text-2xs button--main'
              onClick={(e) => createAdd(e)}
            >
              Create New Account
            </button>
            <table class='table-auto rounded-lg'>
              <thead>
                <tr>
                  <td></td>
                  <td className='text-center text-white uppercase'>Address</td>
                  <td className='text-right pr-1 text-white py-4 uppercase'>
                    Balance
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {state.accounts &&
                  state.accounts.length > 0 &&
                  state.accounts.map((userItem, index) =>
                    userItem.show ? (
                      <div className='contents' key={index}>
                        <UserAddress
                          userAddress={userItem}
                          dispatchWallet={dispatchWallet}
                          password={password}
                          userBalance={
                            balances.length > 0
                              ? balances[0].filter(
                                  (acc) => acc.index === userItem.index
                                )
                              : []
                          }
                        />
                      </div>
                    ) : null
                  )}
              </tbody>
            </table>
            {state.accounts !== undefined ? (
              !state.accounts.some((item) => item.show) && (
                <p class='text-white text-center py-4 px-8'>
                  No Banano Address here, just tap the New Create Account
                  button!
                </p>
              )
            ) : (
              <p class='text-white text-center py-4 px-8'>
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
