//学生信息完善的路由容器组件

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import HeaderIcon from "@/components/headerIcon/headerIcon";
// import { updateUser } from "../../redux/actions";

class StudentInfo extends Component {
  state = {
    header: "",
    post: "",
    info: "",
  };




  render() {
    // 如果信息已经完善, 自动重定向到对应主界面
    // const { header, type } = this.props.user;
    // if (header) {
    //   // 说明信息已经完善
    //   const path = type === "dashen" ? "/dashen" : "/laoban";
    //   return <Redirect to={path} />;
    // }

    return (
      <div>
        <HeaderIcon></HeaderIcon>
      </div>
    );
  }
}
//updateUser
export default connect((state) => ({ user: state.user }), {})(StudentInfo);
