import React, { useReducer, useEffect, useCallback, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoute from "./routes/Main";
import AccountRoutes from "./routes/Accounts";
import ListAccountsRoutes from "./routes/ListAccounts";
import Send from "./routes/Send";
import Settings from "./routes/Settings";
import { addressReduce } from "./helper";
import { WalletContext, HelperContext } from "./context";

import { WalletReducer, PassReducer } from "./reducers";
import { initialWallet, initialPass } from "./reducers";
import { openReceive } from "service";

import { useBananoPending } from "components/hooks/useBananoPending";

function App() {
  const [state, dispatchWallet] = useReducer(WalletReducer, initialWallet);
  const [password, dispatchPass] = useReducer(PassReducer, initialPass);
  const [pendingBlocks, pendings] = useBananoPending();

  const receivePendings = useCallback(
    (blocks) => {
      blocks.map((banAcc) => {
        if (banAcc[1] !== "") {
          state.accounts.map(async (acc) => {
            if (acc.banAddress === banAcc[0] && password.pass !== "") {
              const wasReceived = await openReceive(
                state.seed,
                password.pass,
                acc.index,
                acc.representative,
                acc.banAddress
              );
              console.log(wasReceived);
            }
          });
        }
      });
    },
    [password.pass, state]
  );
  useEffect(() => {
    setInterval(
      () => pendings(JSON.parse(localStorage.getItem("banWallet")).accounts),
      10000
    );
  }, [pendings]);

  useEffect(() => {
    if (pendingBlocks) receivePendings(pendingBlocks);
  }, [pendingBlocks, receivePendings]);

  return (
    <HelperContext.Provider value={{ addressReduce }}>
      <WalletContext.Provider
        value={{
          state,
          dispatchWallet,
          password,
          dispatchPass,
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
