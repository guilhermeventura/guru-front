import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { guruTheme } from "./../../helpers/guru-ui-theme";
import SignIn from "../signin";
import Dashboard from "./../../pages/dashboard";

const AppRoot = () => {
  return (
    <ThemeProvider theme={guruTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRoot;
