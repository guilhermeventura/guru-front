import React from "react";
import ReactGA from "react-ga";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { guruTheme } from "./../../helpers/guru-ui-theme";
import SignIn from "../signin";
import Dashboard from "./../../pages/dashboard";

const history = createHistory();
ReactGA.initialize("UA-144014100-1");
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
  console.log(location.pathname);
});

ReactGA.pageview("/home");

const AppRoot = () => {
  return (
    <ThemeProvider theme={guruTheme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRoot;
