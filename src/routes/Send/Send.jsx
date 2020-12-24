import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { WalletContext, HelperContext } from "context";

function Send() {
  const { state, balances } = useContext(WalletContext);
  const { addressReduce } = useContext(HelperContext);
  const [input, setInput] = React.useState({
    fromAccount: state.accounts[0].banAddress,
    toAccount: "",
    banAmount: "",
  });

  return (
    <Layout>
      <h1 className='structure--title'>Send Bananos</h1>
      <div className='structure pt-2'>
        <div className='flex flex-col'>
          <label className='text-white text-center '>From account:</label>

          <select
            name='banano-address'
            className='w-8/12 h-8 mx-auto rounded-sm mt-2'
            id='banano'
            value={input.fromAccount}
            onChange={(e) => {
              const { value } = e.target;
              setInput((oldData) => ({
                ...oldData,
                ...{ fromAccount: value },
              }));
            }}
          >
            {state.accounts.length > 0 &&
              state.accounts.map(
                (address) =>
                  address.show && (
                    <option value={address.banAddress} className='text-center'>
                      {addressReduce(address.banAddress)}
                      {""}
                      {`(${
                        balances.length > 0
                          ? balances[0].filter(
                              (item) => item.index === address.index
                            )[0].balance
                          : 0
                      } BAN)`}
                    </option>
                  )
              )}
          </select>
          <label className='pt-3 text-white text-center' for='to-account'>
            To account:
          </label>
          <input
            type='number'
            id='to-account'
            placeholder='Account to send to'
            className='w-8/12 p-2 mx-auto rounded-sm mt-2'
            onChange={(e) => {
              const { value } = e.target;
              setInput((oldData) => ({
                ...oldData,
                ...{ toAccount: value },
              }));
            }}
          />
        </div>
        <label className='pt-3 text-white text-center'>Amount</label>
        <div className='relative text-xs w-8/12 mx-auto mt-2'>
          <input
            type='number'
            placeholder='Amount of Banano'
            className='w-full mx-auto p-2  h-8 text-md rounded-sm  '
            value={input.banAmount}
            onChange={(e) =>
              setInput({
                ...input,
                ...{ banAmount: e.target.value },
              })
            }
          />
          <span
            className='absolute top-0 right-0 h-full flex items-center cursor-pointer bg-white pr-1 font-bold my-auto '
            onClick={(e) => {
              e.preventDefault();
              console.log("estou aqui");
              if (balances.length > 0) {
                const data = balances[0].filter(
                  (acc) => acc.banAddress === input.fromAccount
                );
                setInput((oldData) => ({
                  ...oldData,
                  ...{ banAmount: data[0].balance },
                }));
              }
            }}
          >
            Max
          </span>
        </div>
        <button className='button--main text-sm mx-auto mt-4 sm:w-4/12 mb-5'>
          Send Banano!
        </button>
      </div>
    </Layout>
  );
}

export default Send;
