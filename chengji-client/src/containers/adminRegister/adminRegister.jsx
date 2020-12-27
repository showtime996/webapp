//教务员注册的路由组件
import React from "react";
import "antd/dist/antd.css";
import "@/assets/css/loginForm.css";
import bj from "@/assets/css/bj.module.less";
import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Header from "@/components/header/header";
import Fonter from "@/components/fonter/fonter";

// 通过异步action实现交互后台的数据 普通的ui不能得使用函数方式
import { connect } from "react-redux";
// 引入重定向路由
import { Redirect } from "react-router-dom";
import { adminRegister } from "@/redux/actions";
class AdminRegister extends React.Component {
  state = {
    username: "", // 用户名
    password: "", // 密码
    password2: "", // 确认密码
    type: "",
  };

  // 点击注册调用  将值传入到state中
  onFinish = (values) => {
    this.setState({
      username: (this.username = values.username),
      password: (this.password = values.password),
      password2: (this.password2 = values.password2),
      type: (this.type = "admin"),
    });
    //调用redux action中的register方法，判断是否可以注册
    this.props.adminRegister(this.state);
    // console.log(" this.props", this.props.adminRegister);
    // console.log("state", this.state);
  };
  // 点击注册调用

  toLogin = () => {
    this.props.history.replace("/login");
  };

  render() {
    const { msg, redirectTo } = this.props.user;
    // // 如果redirectTo有值, 就需要重定向到指定的路由 从reducer获取
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <div>
        {/* 头部部分 */}
        <Header></Header>
        {/* 中间主体部分 */}
        <div className={bj.logo}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item>
              {msg ? <span className="errorMsg">{msg}</span> : null}
              <div className="login-form-title">教务员注册</div>
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                // onChange={val => { this.handleChange('username', val) }}
                placeholder="教工号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                // onChange={val => { this.handleChange('password', val) }}
              />
            </Form.Item>
            <Form.Item
              name="password2"
              rules={[
                {
                  required: true,
                  message: "请重新输入密码!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="确认密码"
                // onChange={val => { this.handleChange('password2', val) }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
              </Button>
              <p
                className="login-form-registerLogin"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                已有账号？ <a onClick={this.toLogin}>点击登入!</a>
              </p>

              <div
                className="login-form-registerLogin"
                style={{
                  backgroundColor: "#CCC",
                  width: "100%",
                  height: "32px",
                  position: "absolute",
                  bottom: "-24px",
                }}
              >
                <span className="login-form-registerLogin-txt">温馨提示:</span>
                教务员账号为教工号！
              </div>
            </Form.Item>
          </Form>
        </div>
        {/* 底部部分 */}
        <Fonter></Fonter>
      </div>
    );
  }
}

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state) => ({ user: state.user }),
  //  函数确定
  { adminRegister }
)(AdminRegister);
