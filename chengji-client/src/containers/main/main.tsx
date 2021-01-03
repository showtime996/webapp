// 主页面路由组件
import React from "react";
import { Switch, Route } from "react-router-dom";
import StudentInfo from "@/containers/studentInfo/studentInfo.tsx";
import TeacherInfo from "@/containers/teacherInfo/teacherInfo.tsx";
import AdminInfo from "@/containers/adminInfo/adminInfo.tsx";
export default function Main() {
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
