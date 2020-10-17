import React from "react";
import Modal from 'components/modal'

import {
  Route,
  Link,
  useRouteMatch,
  Switch,
  useLocation,
} from "react-router-dom";
import { CreateWallet } from "./CreateWallet";
import { CreateChangePassword } from "../Manage";

function Wallet() {
  let { path, url } = useRouteMatch();
  const loc = useLocation();
  return (
    <>
      <div>
        <ul>
          <li
            className={`text-center text-white ${
              !loc.pathname.match("import") && `text-green-200`
            }`}
          >
            <Link to={`${url}`}>Create Wallet</Link>
          </li>
          <li
            className={`text-center text-white ${
              loc.pathname.match("import") && `text-green-200`
            }`}
          >
            <Link to={`${url}/import`}>Import Wallet</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path={`${url}`}>
          <CreateWallet />
        </Route>
        <Route exact path={`${path}/import`}>
          <ImportWallet />
        </Route>
      </Switch>
    </>
  );
}

const ImportWallet = () => {
  const [seed, setSeed] = React.useState("");
  const [modal, setModal] = React.useState(false);
  
  return (
    <div id='import-wallet' className='py-5'>
      <h2 className='structure--title my-0'>Import Wallet</h2>
      <section className='mb-8'>
        <p className='p-4 text-white'>
          If you already have a Banano wallet, you can import it below. When you
          import a wallet, none of your existing wallets or accounts are
          affected, and your seed is not stored anywhere besides in your local
          client. Use the drop down below to select which type of import you
          want to use.
        </p>
        <div className='w-full flex flex-col md:flex-row items-center justify-center'>
          <input
            type='text'
            name='seed'
            className='w-7/12 md:4/12 pl-2 r'
            placeholder='Put your Banano seed'
            onChange={(e) => setSeed(e.target.value)}
            value={seed}
            autoComplete={"off"}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              seed !== "" && setModal((status) => !status);
            }}
            className='button--main w-6/12 md:w-4/12 mt-2 md:mt-0 md:ml-2 p-1'
          >
            Import Wallet
          </button>
        </div>
      </section>
      <Modal modal={{ value: modal, setModal }}>
        <CreateChangePassword
          create={true}
          importWallet={seed}
          update={false}
        />
      </Modal>
    </div>
  );
};

export default Wallet;
