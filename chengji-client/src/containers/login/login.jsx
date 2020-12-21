//注册的路由组件
import React from "react";
import "antd/dist/antd.css";
import "@/assets/css/loginForm.css";
import bj from "@/assets/css/bj.module.less";
import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Header from "@/components/header/header";
import Fonter from "@/components/fonter/fonter";
// 引入重定向路由
import { Redirect } from "react-router-dom";
// 通过异步action实现交互后台的数据 普通的ui不能得使用函数方式
import { connect } from "react-redux";
import { login } from "@/redux/actions";
class Login extends React.Component {
  state = {
    username: "", // 用户名
    password: "", // 密码
  };

  // 点击注册调用  将值传入到state中
  onFinish = (values) => {
    console.log("Success:", values);
    this.setState({
      username: (this.username = values.username),
      password: (this.username = values.password),
    });
    //调用redux action中的login方法，判断是否可以注册
    this.props.login(this.state);
  };
  // 点击登入调用

  toRegister = () => {
    this.props.history.replace("/register");
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
              <div className="login-form-title">用户登入</div>
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
                placeholder="学号/职工号/教工号"
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入
              </Button>
              <p className="login-form-registerLogin">
                没有账号？ <a onClick={this.toRegister}>点击注册!</a>
              </p>
              <div className="login-form-registerLogin">
                <span className="login-form-registerLogin-txt">温馨提示:</span>
                学生账号为学号,老师账号为职工号，教务员账号为教工号！
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
  { login }
)(Login);
