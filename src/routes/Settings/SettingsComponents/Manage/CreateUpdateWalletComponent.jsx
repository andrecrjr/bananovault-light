import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { WalletContext } from "../../../../context";
import {
  createOrImportWallet,
  validatePassword,
  updatePassword,
} from "./helper";

export const CreateUpdateWallet = ({ create, update, importWallet }) => {
  const history = useHistory();

  const { dispatchWallet, password } = useContext(WalletContext);
  const [data, setData] = useState({
    input1: "",
    input2: "",
    error: false,
    info: "",
  });

  const createWalletOrUpdatePassword = async (e) => {
    e.preventDefault();
    setData((data) => ({ ...data, ...{ error: false, info: "" } }));
    let isValidated = false;
    let createOrImportWalletValidation = data.input1 === data.input2 && create;
    let validationPass = validatePassword(password, setData, data, update);

    if (createOrImportWalletValidation) {
      isValidated =
        validationPass &&
        (await createOrImportWallet(
          data,
          setData,
          dispatchWallet,
          importWallet
        ));
    } else {
      isValidated =
        validationPass && updatePassword(password, dispatchWallet, data);
    }

    if (isValidated) {
      history.push("/accounts");
    }
  };

  return (
    <section className='flex flex-col items-center bg-dark-gray p-5'>
      <h1 className='structure--title mt-0'>
        {create ? `Create` : `Update`} Wallet{update && ` Password`}
      </h1>
      {data.error ? <p className='text-white'>{data.info}</p> : null}
      <div className='flex items-center flex-col sm:flex-row sm:justify-center'>
        <input
          type='password'
          onChange={(e) => setData({ ...data, ...{ input1: e.target.value } })}
          placeholder='New password'
        />
        <input
          type='password'
          onChange={(e) => setData({ ...data, ...{ input2: e.target.value } })}
          className='mt-2 sm:mt-0 sm:ml-5'
          placeholder='Confirm New Password'
        />
      </div>
      <button
        onClick={createWalletOrUpdatePassword}
        disabled={
          (data.input1 !== "" && data.input2 !== "" && create) ||
          (update && data.input1 !== "" && data.input2 !== "")
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
