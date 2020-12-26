// 主页面路由组件
import React from "react";
import { Switch, Route } from "react-router-dom";
import StudentInfo from "@/containers/studentInfo/studentInfo";
import TeacherInfo from "@/containers/teacherInfo/teacherInfo";
import AdminInfo from "@/containers/adminInfo/adminInfo";
export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/studentInfo" component={StudentInfo}></Route>
          <Route path="/teacherInfo" component={TeacherInfo}></Route>
          <Route path="/adminInfo" component={AdminInfo}></Route>
        </Switch>
      </div>
    );
  }
}
