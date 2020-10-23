import React, { useState } from "react";
import Layout from "../../components/Layout";
import { getBalance } from "service";
import { useParams } from "react-router-dom";
import { getAmountPartsFromRaw } from "@bananocoin/bananojs/app/scripts/banano-util";

function Accounts() {
  const { bananoAddress } = useParams();
  const [accountUser, setAccountsUser] = useState({});
  React.useEffect(() => {
    const getUserAccount = async () => {
      const data = await getBalance(bananoAddress, true);
      setAccountsUser(data || 0);
    };
    getUserAccount();
  }, [bananoAddress]);
  return (
    <Layout>
      <h1 className='structure--title'>Account Balance</h1>
      <div className='structure pt-2 sm:grid text-white p-8 '>
        <div className='flex flex-col sm:flex-row'>
          <img
            src={`https://monkey.banano.cc/api/v1/monkey/${bananoAddress}?format=png&size=200`}
            className='w-2/4 mx-auto sm:mx-auto'
            alt='banano-account'
          />
          <h1 className='flex sm:w-2/3 sm:mr-6 lg:mr-16 text-sm align-center mb-4 sm:mb-0 text-gray-600 items-center break-all'>
            {bananoAddress}
          </h1>
        </div>
        <div className='flex flex-row justify-evenly sm:flex-col items-end'>
          <div className='flex flex-col font-thin'>
            <p className='text-right'>Balance:</p>
            <p className='w-auto align-end'>{accountUser.balance || 0} BAN</p>
          </div>
          <div className='flex flex-col font-thin'>
            <p className='text-right'> Pending:</p>
            <p className='w-auto align-end'>{accountUser.pending || 0} BAN</p>
          </div>
        </div>
        <p className='w-auto break-all mt-8 text-gray-700 text-sm col-span-2'>
          Representative:
          {accountUser.representative || `No representative chose`}
        </p>
      </div>
      <TableTransactions history={accountUser.history || null} />
    </Layout>
  );
}

const TableTransactions = ({ history }) => {
  console.log(history);
  return (
    <>
      <h1 className='structure--title'>Recent Transactions</h1>
      <div className='structure md:w-9/12 sm:grid text-white mb-10'>
        <table class='table-auto rounded-lg'>
          <thead>
            <tr className='bg-weak-gray'>
              <th className='text-left py-4 px-4 uppercase '>Account</th>
              <th className='text-right uppercase pr-5 md:pr-10'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(history &&
              history.map((trx) => (
                <tr>
                  <td className='break-all py-4 px-4 text-xs w-8/12 '>
                    {trx.account}
                  </td>
                  <td className='text-right pr-5 md:pr-10 text-2xs text-green'>
                    +{getAmountPartsFromRaw(trx.amount, "ban_").banano || 0} BAN
                  </td>
                </tr>
              ))) || <p>Loading history!</p>}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Accounts;
