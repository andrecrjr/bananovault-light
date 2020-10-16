import React, { useContext } from "react";
import { WalletContext } from "../../../../context";
import {createUserBan} from './helper'

function Manage() {
  return (
    <>
      <CreateChangePassword />
      <section class="mt-10">
        <h1 className="structure--title mt-0">Export BananoVault Wallet</h1>
        <div className="p-3 pt-0 ">
          <p className="text-white text-xs">
            Use this export tool to simplify wallet transfer to other devices.
            Your data will be encrypted by your password, and then imported into
            BananoVault on your new device! The export does not contain your
            address book.
          </p>
          <div className="flex flex-col items-center sm:flex-row">
            <button className="button--main">Export as File</button>
            <button className="button--main mt-4 sm:mt-0 sm:ml-4">
              Export QR Code
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export const CreateChangePassword = ({ create, update }) => {
  const { dispatchWallet, password } = useContext(WalletContext);
  const [data, setData] = React.useState({
    input1: "",
    input2: "",
    error: false,
  });
  const updateCreatePass = async (e) => {
    e.preventDefault();
    if (
      data.input1 === data.input2 &&
      data.input1 !== "" &&
      data.input2 !== "" &&
      create
    ) {
      setData((data) => ({ ...data, ...{ error: false } }));
      createUserBan()
      dispatchWallet({ type: "CREATE_PASSWORD", payload: await createUserBan(data.input1) });
    } else {
      setData((data) => ({ ...data, ...{ error: true } }));
    }
    if (
      data.input1 !== "" &&
      data.input2 !== "" &&
      data.input2 === data.input1 &&
      password.password.length > 0 &&
      update
    ) {
      setData((data) => ({ ...data, ...{ error: false } }));
      dispatchWallet({
        type: "UPDATE_PASSWORD",
        payload: { actualValue: password.password, newValue:data.input1 },
      });
    } else {
      setData((data) => ({ ...data, ...{ error: true } }));
    }
  };
  return (
    <section className='flex flex-col items-center'>
      <h1 className='structure--title mt-0'>
        {create ? `Create` : `Update`} Wallet Password
      </h1>

      <div className='flex items-center flex-col sm:flex-row sm:justify-center'>
        <input
          type='text'
          onChange={(e) => setData({ ...data, ...{ input1: e.target.value } })}
          placeholder='New password'
        />
        <input
          type='text'
          onChange={(e) => setData({ ...data, ...{ input2: e.target.value } })}
          className='mt-2 sm:mt-0 sm:ml-5'
          placeholder='Confirm New Password'
        />
      </div>
      <button
        onClick={updateCreatePass}
        disabled={(data.input1 !== "" && data.input2 !== "" && create) 
        || (update && password.password.length > 0) ? false : true}
        className='button--main w-5/12 mt-4'
      >
        {create ? `Create` : `Update`} Password
      </button>
    </section>
  );
};

export default Manage;
