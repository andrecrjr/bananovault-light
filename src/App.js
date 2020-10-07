import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoute from "./routes/Main";
import AccountRoutes from "./routes/Accounts";
import ListAccountsRoutes from "./routes/ListAccounts";
import Send from "./routes/Send";
import Settings from "./routes/Settings";

import SecureLS from "secure-ls";

function App() {
  var ls = new SecureLS({ encodingType: "AES", isCompression: false });
  React.useEffect(() => {
    const data = ls.get("banWallet");
    console.log(data);
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainRoute />
        </Route>
        <Route path="/accounts">
          <ListAccountsRoutes />
        </Route>
        <Route path="/account/:bananoaccount">
          <AccountRoutes />
        </Route>
        <Route path="/send">
          <Send />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
