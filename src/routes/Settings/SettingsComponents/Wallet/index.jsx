import React from "react";

import {
  Route,
  Link,
  useRouteMatch,
  Switch,
  useLocation,
} from "react-router-dom";
import ImportWallet from "./ImportWallet";
import CreateWallet from "./CreateWallet";

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

export default Wallet;
