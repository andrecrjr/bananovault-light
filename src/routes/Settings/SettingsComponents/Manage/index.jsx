import React, { useContext } from "react";
import { useHistory } from "react-router";
import { WalletContext } from "../../../../context";
import { validationInputs } from "./helper";

function Manage() {
  return (
    <>
      <CreateChangePassword update={true} />
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

export const CreateChangePassword = ({ create, update, importWallet }) => {
  const history = useHistory()
  console.log(importWallet);;
  const { dispatchWallet, password } = useContext(WalletContext);
  const [data, setData] = React.useState({
    input1: "",
    input2: "",
    error: false,
    info:""
  });

  const updateCreatePass = async (e) => {
    e.preventDefault();
    setData(data => ({ ...data, ...{ error: false, info: "" } }))
    const isValidated = await validationInputs(data,
        setData,  
         password,
         dispatchWallet,
         importWallet,
         create,    
         update
    );

    if (isValidated) {
      history.push("/");
    }
  
  };

  return (
    <section className='flex flex-col items-center bg-dark-gray p-5'>
      <h1 className='structure--title mt-0'>
        {create ? `Create` : `Update`} Wallet Password
      </h1>
      {data.error ? (
        <p className='text-white'>
          {data.info}
        </p>
      ) : null}
      <div className='flex items-center flex-col sm:flex-row sm:justify-center'>
        <input
          type='text'
          onChange={(e) => (setData({...data, ...{ input1: e.target.value } }))}
          placeholder='New password'
        />
        <input
          type='text'
          onChange={(e) =>( setData({...data, ...{ input2: e.target.value } }))}
          className='mt-2 sm:mt-0 sm:ml-5'
          placeholder='Confirm New Password'
        />
      </div>
      <button
        onClick={updateCreatePass}
        disabled={
          (data.input1 !== "" && data.input2 !== "" && create) ||
            (update &&
              data.input1 !== "" &&
              data.input2 !== "")
            ? false
            : true
        }
        className='button--main w-5/12 mt-4'
      >
        {create ? `Create` : `Update`} {create ? `Wallet` : `Password`}
      </button>
    </section>
  );
};



export default Manage;
