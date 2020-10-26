import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoute from "./routes/Main";
import AccountRoutes from "./routes/Accounts";
import ListAccountsRoutes from "./routes/ListAccounts";
import Send from "./routes/Send";
import Settings from "./routes/Settings";
import { banWallet } from "settings";
import { WalletContext, HelperContext } from "./context";
import io from "socket.io-client";

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
    let ws = new WebSocket("wss://ws.banano.cc");

    ws.onopen = () => {
      const confirmation_subscription = {
        action: "subscribe",
        topic: "confirmation",
        options: {
          all_local_accounts: true,
          accounts: [state.accounts[0].banAddress],
        },
      };
      ws.send(JSON.stringify(confirmation_subscription));
      console.log("Open");
    };

    ws.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
    });

    if (state.accounts) {
      dispatchWallet({ type: "TOTAL_AMOUNT_USER" });
    } else {
      localStorage.setItem("banWallet", JSON.stringify(banWallet));
    }
  }, [dispatchWallet, state.accounts]);
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
