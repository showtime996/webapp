// 入口的js
import React from "react";
import ReactDOM from "react-dom";
// react-router-dom比react-router功能更多
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import Register from "@/containers/adminRegister/adminRegister.tsx";
import Main from "@/containers/main/main.tsx";
import Login from "@/containers/login/login.tsx";
import store from "./redux/store";
const app = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/adminRegister" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        {/* 默认的组件 */}
        <Route component={Main}></Route>
        {/* <Redirect to="/login"></Redirect> */}
      </Switch>
    </HashRouter>
  </Provider>,
  app
);
