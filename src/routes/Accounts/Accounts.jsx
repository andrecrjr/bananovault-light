
import React from "react";
import Layout from "../../components/Layout";

function Accounts() {
  return (
    <Layout>
      <h1 className='structure--title'>Account Balance</h1>
      <div className='structure pt-2 sm:grid text-white p-8 '>
        <div className='flex flex-col sm:flex-row'>
          <span>
            <img
              src='https://monkey.banano.cc/api/v1/monkey/ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke?format=png&size=250'
              className='w-54 mx-auto'
              alt='banano-account'
            />
          </span>
          <h1 className='flex sm:w-1/3 text-sm align-center mb-4 sm:mb-0 text-gray-600 items-center break-all'>
            ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke
          </h1>
        </div>
        <div className='flex flex-row justify-evenly sm:flex-col items-end'>
          <div className='flex flex-col font-thin'>
            <p>Balance:</p>
            <p className='w-auto align-end'>0 BAN</p>
          </div>
          <div className='flex flex-col font-thin'>
            <p> Pending:</p>
            <p className='w-auto align-end'>0 BAN</p>
          </div>
        </div>
        <p className='w-auto break-all text-gray-700 text-sm col-span-2'>
          Representative:
          ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke
        </p>
      </div>
      <TableTransactions />
    </Layout>
  );
}

const TableTransactions = () => {
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
            <tr>
              <td className='break-all py-4 px-4 text-xs w-8/12 '>
                ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke
              </td>
              <td className='text-right pr-5 md:pr-10 text-2xs text-green'>
                +15.0 BAN
              </td>
            </tr>
            <tr>
              <td className='break-all text-xs w-9/12 py-4 px-4'>
                ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke
              </td>
              <td className='text-right pr-5 md:pr-10 text-2xs text-green'>
                +15.0 BAN
              </td>
            </tr>
            <tr>
              <td className='break-all text-xs w-9/12 py-4 px-4'>
                ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke
              </td>
              <td className='text-right pr-5 md:pr-10 text-2xs text-green'>
                +100000.0 BAN
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Accounts;


