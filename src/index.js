import React from "react";
import ReactDOM from "react-dom";
import AppRoot from "./components/app-root";
import * as serviceWorker from "./serviceWorker";

import "./main.scss";

ReactDOM.render(<AppRoot />, document.getElementById("guru-app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
