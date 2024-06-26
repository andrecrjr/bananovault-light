import React from "react";
import { WalletContext } from "../../context";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import * as CryptoJS from "crypto-js";
import Modal from "../modal";

function Header() {
  const { password, dispatchPass, state, balances } = React.useContext(
    WalletContext
  );

  const [pass, setPass] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const unlock = () => {
    if (pass.length > 0) {
      unlockPass(state, dispatchPass, pass, setPass, setModal);
    }
  };
  const openModal = () => {
    let body = document.querySelector("body");
    body.classList.add("bg-color-black");
    setModal((item) => !item);
  };

  return (
    <header className='flex w-full h-full shadow-xl p-4 justify-center text-white'>
      <div className='flex flex-col h-full md:flex-row sm:mx-auto justify-center items-center'>
        <div className='md:absolute md:left-0 md:pl-20'>
          <Link to='/'>[BanVault Light]</Link>
          <button onClick={openModal}>
            {state && `${password.pass.length > 0 ? `🔓` : `🔒`}`}
          </button>
        </div>
        <div className='font-bold'>
          {balances.length > 0 ? balances[1] : 0} BAN
        </div>
      </div>
      <Menu />
      <Modal modal={{ value: modal, setModal }}>
        <div className='bg-dark-gray'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              unlock();
            }}
          >
            <h1 className='structure--title mt-0 p-3'>Wallet Password</h1>
            <input
              type='password'
              className='mb-5'
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              placeholder="Wallet's password"
            />
            <button onClick={unlock} className='button--main'>
              Unlock Wallet
            </button>
          </form>
        </div>
      </Modal>
    </header>
  );
}

const unlockPass = (state, dispatchPass, pass, setPass, setModal) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(state.seed, pass);
    const decryptedSeed = decryptedBytes.toString(CryptoJS.enc.Utf8);
    setPass("");
    if (!decryptedSeed || decryptedSeed.length !== 64) {
      return false;
    } else {
      dispatchPass({ type: "INPUT_PASSWORD", payload: pass });
      setTimeout(() => {
        dispatchPass({ type: "INPUT_PASSWORD", payload: "" });
        console.log("acabou");
      }, state.timer * 1000);
      setModal(false);
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

export default Header;
