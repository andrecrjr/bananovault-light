import { WalletContext, HelperContext } from "context";
import React, { useContext } from "react";

function Representative() {
  const { state } = useContext(WalletContext);

  return (
    <>
      <section className='mx-auto px-2'>
        <section className='w-full'>
          <h1 className='structure--title mt-0'>Representatives</h1>
          {state &&
            state.accounts.length > 0 &&
            state.accounts.some(
              (item) => item.representative.length > 0 && item.show === true
            ) && (
              <RepresentativeTable
                rep={state.accounts.filter(
                  (item) => item.show === true && item.representative
                )}
              />
            )}
        </section>
      </section>
      <section className='mt-5'>
        <ChangeRepresentative />
      </section>
    </>
  );
}

export const RepresentativeTable = ({ rep }) => {
  const { addressReduce } = useContext(HelperContext);
  return (
    <>
      <h2 className='text-xs text-white'>
        You have delegated voting weight to the following representatives
      </h2>
      <table className='text-xs mt-4 w-full text-white'>
        <thead>
          <tr className='font-bold'>
            <td className='pb-4'>Status</td>
            <td className='pb-4'>Representatives</td>
            <td className='pb-4'>Weight</td>
          </tr>
        </thead>
        <tbody>
          {rep.map((item) => (
            <tr>
              <td className='pb-4'>Unknown</td>
              <td className='pb-4'>
                {item.representative && addressReduce(item.representative)}
              </td>
              <td className='pb-4'>0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const ChangeRepresentative = () => {
  return (
    <>
      <h1 className='structure--title my-4 pb-0 mb-1 '>
        Change your representatives
      </h1>
      <section className='sm:w-10/12 mx-auto px-2 flex justify-center items-center flex-col'>
        <h2 className='text-white'>Account to change:</h2>
        <select name='representative-choice' className='w-full' id=''>
          <option>ban_3pyd7if4ds...64as6dx6x</option>
        </select>
        <h2 className='text-white pt-4'>New Representative:</h2>
        <input
          type='text'
          className='w-full'
          placeholder='new Representative address'
        />
        <button className='button--main  sm:w-6/12 mt-4'>
          Change Representative
        </button>
      </section>
    </>
  );
};

export default Representative;
