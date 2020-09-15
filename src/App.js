import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainRoute from "./routes/Main";
import AccountRoutes from "./routes/Accounts";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <MainRoute />
      </Route>
      <Route exact path="/accounts">
        <AccountRoutes />
      </Route>
    </Router>
  );
}

export default App;
