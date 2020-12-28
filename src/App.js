import React, { useReducer, useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoute from "./routes/Main";
import AccountRoutes from "./routes/Accounts";
import ListAccountsRoutes from "./routes/ListAccounts";
import Send from "./routes/Send";
import Settings from "./routes/Settings";
import { addressReduce, updateBananoAmounts } from "./helper";
import { WalletContext, HelperContext } from "./context";

import { WalletReducer, PassReducer } from "./reducers";
import { initialWallet, initialPass } from "./reducers";

import { useBananoPending } from "components/hooks/useBananoPending";
import { useAutoReceive } from "components/hooks/useAutoReceive";

function App() {
  const [state, dispatchWallet] = useReducer(WalletReducer, initialWallet);
  const [password, dispatchPass] = useReducer(PassReducer, initialPass);
  const [balances, setBalances] = useState([]);

  const [pendingBlocks, pendings] = useBananoPending();
  const [autoReceived, receivePendings] = useAutoReceive(state, password);

  useEffect(() => {
    setInterval(() => {
      pendings(state !== null ? state.accounts : []);
    }, 20000);
  }, [pendings, state]);

  const updateHeaderAmount = useCallback(async () => {
    setBalances(await updateBananoAmounts(state));
  }, [state]);

  useEffect(() => {
    state !== null || autoReceived ? updateHeaderAmount() : setBalances(0);
  }, [state, updateHeaderAmount, autoReceived]);

  useEffect(() => {
    console.log(pendingBlocks);
    if (pendingBlocks) {
      receivePendings(pendingBlocks);
    }
  }, [pendingBlocks, receivePendings]);

  return (
    <HelperContext.Provider value={{ addressReduce }}>
      <WalletContext.Provider
        value={{
          state,
          dispatchWallet,
          password,
          dispatchPass,
          pendingBlocks,
          balances,
        }}
      >
        <Router>
          <Switch>
            <Route exact path='/'>
              <MainRoute />
            </Route>
            <Route path='/accounts'>
              <ListAccountsRoutes />
            </Route>
            <Route exact path='/account/:bananoAddress'>
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
    </HelperContext.Provider>
  );
}

export default App;
