/*
    入口js
 */

import React from "react";
import ReactDom from "react-dom";
import {Provider} from "./lib/react-redux";

import App from "./App";
import store from "./redux/store";


console.log("state", store.getState());

ReactDom.render((
    <Provider store={store}>
       <App/>
    </Provider>
), document.getElementById("root"));
