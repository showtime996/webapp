// 入口的js
import React from "react";
import ReactDOM from "react-dom";
// react-router-dom比react-router功能更多
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import Register from "@/containers/register";
import Main from "@/containers/main";
import Login from "@/containers/login";
import store from "./redux/store";
const app = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        {/* 默认的组件 */}
        <Route component={Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>,
  app
);
