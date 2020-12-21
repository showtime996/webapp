// 主页面路由组件
import React from "react";
import { Switch, Route } from "react-router-dom";
import StudentInfo from "@/containers/studentInfo/studentInfo";
import TeacherInfo from "@/containers/teacherInfo/teacherInfo";
export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/studentInfo" component={StudentInfo}>student</Route>
          <Route path="/teacherInfo" component={TeacherInfo}>teacher</Route>
        </Switch>
      </div>
    );
  }
}
