import React from "react";
import { createNewWallet } from "../../../../service";
import SecureLS from "secure-ls";
import { CreateChangePassword } from "../Manage";

const useState = {
  banUser: {
    displayDenomination: "BANANO",
    walletStore: "localStorage",
    displayCurrency: "USD",
    defaultRepresentative: null,
    lockOnClose: 1,
    lockInactivityMinutes: 30,
    powSource: "best",
    serverName: "bananovault",
    serverAPI: null,
    serverNode: null,
    serverWS: null,
    minimumReceive: null,
  },
};
export const banWallet = {
  seed: "",
  mainBanAddress: "",
  locked: true,
  type: "seed",
};
export const CreateWallet = () => {
  const [stepTwo, setStepTwo] = React.useState(false);
  var ls = new SecureLS({ encodingType: "AES", isCompression: false });
  const generateWallet = async (e) => {
    e.preventDefault();
    try {
      const data = await createNewWallet();
      const state = { ...banWallet, ...data };
      ls.set("banWallet", state);
      setStepTwo(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col py-5" id="create-wallet">
      <div className={stepTwo ? `block` : `hidden`}>
        <CreateChangePassword create={true} update={false} />
      </div>
      <div className={stepTwo ? `hidden` : `block`}>
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
        <button
          onClick={generateWallet}
          className="button--main mx-auto w-4/12 mt-5"
        >
          Create Wallet
        </button>
      </div>
    </div>
  );
};