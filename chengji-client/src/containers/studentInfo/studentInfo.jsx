//学生信息完善的路由容器组件

import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {} from "@/components/headerIcon/headerIcon";

// import HeaderSelector from "../../components/header-selector/header-selector";
// import { updateUser } from "../../redux/actions";

export default class StudentInfo extends React.Component {
  state = {
    header: "",
    post: "",
    info: "",
  };

  // 更新header状态
  setHeader = (header) => {
    this.setState({
      header,
    });
  };

  handleChange = (name, value) => {
    // debugger
    this.setState({
      [name]: value,
    });
  };

  save = () => {
    this.props.updateUser(this.state);
  };

  render() {
    // 如果信息已经完善, 自动重定向到对应主界面
    const { header, type } = this.props.user;
    if (header) {
      // 说明信息已经完善
      const path = type === "dashen" ? "/dashen" : "/laoban";
      return <Redirect to={path} />;
    }

    return <div>student</div>;
  }
}
