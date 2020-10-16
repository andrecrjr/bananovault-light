import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoute from "./routes/Main";
import AccountRoutes from "./routes/Accounts";
import ListAccountsRoutes from "./routes/ListAccounts";
import Send from "./routes/Send";
import Settings from "./routes/Settings";
import { WalletContext } from "./context";

import { WalletReducer, PassReducer } from "./reducers";
import { initialWallet, initialPass } from "./reducers";


function App() {
  const [state, dispatchWallet] = useReducer(WalletReducer, initialWallet);
  const [password, dispatchPass] = useReducer(PassReducer, initialPass);
  React.useEffect(() => {
    
  }, []);
  return (
    <WalletContext.Provider
      value={{ state, dispatchWallet, 
        password, dispatchPass }}   
    >
      <Router>
        <Switch>
          <Route exact path='/'>
            <MainRoute />
          </Route>
          <Route path='/accounts'>
            <ListAccountsRoutes />
          </Route>
          <Route exact path='/account/:bananoaccount'>
            <AccountRoutes />
          </Route>
          <Route path='/send'>
            <Send />
          </Route>
          <Route path='/settings'>
            <Settings />
          </Route>
        </Switch>
      </Router>
    </WalletContext.Provider>
  );
}

export default App;
