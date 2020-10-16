import React from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "../../context";
import * as CryptoJS from "crypto-js";

// unlock wallet
//  const decryptedBytes = CryptoJS.AES.decrypt(this.wallet.seed, password);
//       const decryptedSeed = decryptedBytes.toString(CryptoJS.enc.Utf8);
//       if (!decryptedSeed || decryptedSeed.length !== 64) return false;
function Header() {
  const { password, dispatchPass, state } = React.useContext(WalletContext);
  const [pass, setPass] = React.useState("");
  const unlock = () => {
    if (pass.length > 0) {
      unlockPass(password, state, dispatchPass, pass);
    }
  };
  return (
    <header className='w-full h-full shadow-xl p-4 text-white'>
      <div className='flex flex-col h-full px-4 md:flex-row sm:mx-auto justify-center items-center'>
        <div className='md:absolute md:left-0 md:pl-20'>
          <Link to='/'>[BanVault Light]</Link>
          <button>{ password.password.length > 0 ? `🔓` : `🔒`}</button>
          <div className='absolute left-5 w-auto text-black'>
            <input
              type='text'
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button onClick={unlock} className='button--main'>
              Unlock Wallet
            </button>
          </div>
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
    </header>
  );
}

const unlockPass = (password, state, dispatchPass, pass) => {
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
      }, password.timer);
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

export default Header;
