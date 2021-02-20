/*
    入口js
 */

import React from "react";
import ReactDom from "react-dom";

import App from "./App";
import store from "./redux/store";

ReactDom.render(<App store={store}/>, document.getElementById("root"));

// 给store绑定状态更新的监听
store.subscribe(() => { // store内部的状态数据改变时回调
  // 重新渲染App组件标签
  ReactDom.render(<App store={store}/>, document.getElementById("root"));
})