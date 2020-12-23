import React from "react";
import { CreateUpdateWallet as CreateNewWallet } from "../Manage/CreateUpdateWalletComponent";

import Modal from "components/modal";

const CreateWallet = () => {
  const [modal, setModal] = React.useState(false);

  return (
    <div className='flex flex-col py-5' id='create-wallet'>
      <div>
        <h2 className='structure--title my-0'>Create Wallet</h2>
        <p className='p-4 text-white'>
          When you create a new wallet, a new Banano seed will be generated
          which can be used to create brand new accounts on the Banano network.
          Your Banano seed is the master key to all of your accounts and any
          money inside of them!
        </p>
        <p className='p-5  font-bold text-green-500'>
          Make sure you back up your seed, write it down, and keep it incredibly
          safe! There is NO way to recover it after creation, and all funds
          inside WILL be lost without it! You have been warned!
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            setModal((status) => !status);
          }}
          className='button--main mx-auto w-4/12 mt-5'
        >
          Create Wallet
        </button>
      </div>
      <Modal modal={{ value: modal, setModal }}>
        <CreateNewWallet create={true} update={false} />
      </Modal>
    </div>
  );
};

export default CreateWallet;
