// 主页面路由组件
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import StudentInfo from "@/containers/studentInfo";
import TeacherInfo from "@/containers/teacherInfo";
import AdminInfo from "@/containers/adminInfo";
import Student from "../student";
import Admin from "../admin";
import Cookies from "js-cookie";
import Teacher from "../teacher";
export default function Main() {
  const userid = Cookies.get("userid");
  return (
    <div>
      <Switch>
        {!userid && <Redirect to="/login"></Redirect>}
        <Route path="/studentInfo" component={StudentInfo}></Route>
        <Route path="/teacherInfo" component={TeacherInfo}></Route>
        <Route path="/adminInfo" component={AdminInfo}></Route>
        <Route path="/student" component={Student}></Route>
        <Route path="/teacher" component={Teacher}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/">
          <Redirect to="/login"></Redirect>
        </Route>
      </Switch>
    </div>
  );
}
