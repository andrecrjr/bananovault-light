import React from "react";
import Layout from "../Layout";
import { Route, Link, useRouteMatch, Switch } from "react-router-dom";
import Manage from "./Manage";
import Representative from "./Representative";
import Wallet from "./Wallet";

function Settings() {
  let { path, url } = useRouteMatch();

  return (
    <Layout>
      <h1 className="structure--title mt-1">Settings</h1>
      <div className="structure shadow-none py-5 sm:py-2">
        <nav>
          <ul className="flex flex-col text-center text-white text-xs justify-evenly sm:flex-row">
            <li className="pt-2 sm:pt-0">
              <Link to={`${url}/representative`}>Representative</Link>
            </li>
            <li className="pt-2 sm:pt-0">
              <Link to={`${url}/manage`}>Manage Wallet</Link>
            </li>
            <li className="pt-2 sm:pt-0">
              <Link to={`${url}/wallet`}>Create or Import Wallet</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="structure py-5">
        <Switch>
          <Route path={`${path}/representative`}>
            <Representative />
          </Route>
          <Route path={`${path}/manage`}>
            <Manage />
          </Route>
          <Route path={`${path}/wallet`}>
            <Wallet />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
}

export default Settings;
