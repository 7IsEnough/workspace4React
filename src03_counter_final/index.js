/*
    入口js
 */

import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";

import App from "./containers/App";
import store from "./redux/store";

ReactDom.render((
    <Provider store={store}>
      <App store={store}/>
    </Provider>
),document.getElementById("root"));
