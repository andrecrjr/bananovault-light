import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoute from "./routes/Main";
import AccountRoutes from "./routes/Accounts";
import ListAccountsRoutes from "./routes/ListAccounts";
import Send from "./routes/Send";
import Settings from "./routes/Settings";
import { WalletContext, HelperContext } from "./context";

import { WalletReducer, PassReducer } from "./reducers";
import { initialWallet, initialPass } from "./reducers";

function App() {
  const [state, dispatchWallet] = useReducer(WalletReducer, initialWallet);
  const [password, dispatchPass] = useReducer(PassReducer, initialPass);
  const addressReduce = (address) => {
    let firstPart = address.substring(0, 11);
    let secondPart = address.substring(55, 64);
    return `${firstPart}...${secondPart}`;
  };
  React.useEffect(() => {
    dispatchWallet({ type: "TOTAL_AMOUNT_USER" });
  }, [dispatchWallet]);
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
