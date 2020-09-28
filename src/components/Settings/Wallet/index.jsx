import React from "react";

function Wallet() {
  return (
    <>
      <div className="flex flex-col py-5" id="create-wallet">
        <h2 className="structure--title my-0">Create Wallet</h2>
        <p className="p-4 text-white">
          When you create a new wallet, a new Banano seed will be generated
          which can be used to create brand new accounts on the Banano network.
          Your Banano seed is the master key to all of your accounts and any
          money inside of them!
        </p>
        <p className="p-5  font-bold text-green-500">
          Make sure you back up your seed, write it down, and keep it incredibly
          safe! There is NO way to recover it after creation, and all funds
          inside WILL be lost without it! You have been warned!
        </p>
        <button className="button--main mx-auto w-4/12 mt-5">
          Create Wallet
        </button>
      </div>
      <div id="import-wallet" className="pt-24 pb-20">
        <h2 className="structure--title my-0">Import Wallet</h2>
        <p className="p-4 text-white">
          If you already have a Banano wallet, you can import it below. When you
          import a wallet, none of your existing wallets or accounts are
          affected, and your seed is not stored anywhere besides in your local
          client. Use the drop down below to select which type of import you
          want to use.
        </p>
        <div className="w-full flex flex-col md:flex-row items-center justify-center">
          <input
            type="text"
            name="seed"
            className="w-7/12 md:4/12 pl-2 r"
            placeholder="Put your Banano seed"
          />
          <button className="button--main w-6/12 md:w-4/12 mt-2 md:mt-0 md:ml-2 p-1">
            Import Wallet
          </button>
        </div>
      </div>
    </>
  );
}

export default Wallet;
