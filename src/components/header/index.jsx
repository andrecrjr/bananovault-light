import React from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "../../context";
import * as CryptoJS from "crypto-js";
import Modal from "../modal";


function Header() {
  const { password, dispatchPass, state } = React.useContext(WalletContext);
  const [pass, setPass] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const unlock = () => {
    if (pass.length > 0) {
      unlockPass(state, dispatchPass, pass, setModal);
    }
  };
  const openModal = () => {
    let body = document.querySelector("body");
    body.classList.add("bg-color-black");
    setModal((item) => !item);
  };

  return (
    <header className='w-full h-full shadow-xl p-4 text-white'>
      <div className='flex flex-col h-full px-4 md:flex-row sm:mx-auto justify-center items-center'>
        <div className='md:absolute md:left-0 md:pl-20'>
          <Link to='/'>[BanVault Light]</Link>
          <button onClick={openModal}>
            {state && `${password.password.length > 0 ? `🔓` : `🔒`}`}
          </button>
        </div>
        <div className='font-bold'>0 BAN</div>
        <ul className='list-none inline-flex text-sm md:absolute md:right-0 md:pr-10'>
          <li className='header__menu--item sm:pt-0'>
            <Link to='/accounts'>Accounts</Link>
          </li>
          <li className='header__menu--item  sm:pt-0'>
            <Link to='/send'>Send</Link>
          </li>
          <li className='header__menu--item  sm:pt-0'>Address Book</li>
          <li className='header__menu--item  sm:pt-0'>
            <Link to='/settings'>Settings</Link>
          </li>
        </ul>
      </div>
      <Modal modal={{ value: modal, setModal }}>
        <div className='p-5 bg-dark-gray'>
          <h1 className='structure--title mt-0 p-3'>Wallet Password</h1>
          <input
            type='text'
            className='mb-5'
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            placeholder="Wallet's password"
          />
          <button onClick={unlock} className='button--main'>
            Unlock Wallet
          </button>
        </div>
      </Modal>
    </header>
  );
}

const unlockPass = (state, dispatchPass, pass, setModal) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(state.seed, pass);
    const decryptedSeed = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedSeed || decryptedSeed.length !== 64) {
      return false;
    } else {
      dispatchPass({ type: "REPLACE_PASSWORD", payload: pass });
      setTimeout(() => {
        dispatchPass({ type: "REPLACE_PASSWORD", payload: "" });
        console.log("acabou");
      }, state.timer);
      setModal(false);
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

export default Header;
