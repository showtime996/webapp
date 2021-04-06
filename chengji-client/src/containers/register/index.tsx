//教务员注册的路由组件
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "@/assets/css/loginForm.less";
import bj from "@/assets/css/bj.module.less";
import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Header from "@/components/header/index.tsx";
import Fonter from "@/components/fonter/index.tsx";

// 通过异步action实现交互后台的数据 普通的ui不能得使用函数方式
import { connect, RootStateOrAny } from "react-redux";
// 引入重定向路由
import { Redirect } from "react-router-dom";
import {
  adminRegister,
  teacherRegister,
  studentRegister,
} from "../../redux/actions";
function Register(props) {
  const [state, setState] = useState({
    username: "", // 用户名
    password: "", // 密码
    password2: "", // 确认密码
    type: "",
  });

  // 点击注册调用  将值传入到state中
  const onFinish = (values: {
    username: string;
    password: string;
    password2: string;
    type: string;
  }) => {
    console.log("value", values);

    setState({
      username: (state.username = values.username),
      password: (state.password = values.password),
      password2: (state.password2 = values.password2),
      type: (state.type = values.type),
    });
    //调用redux action中的register方法，判断是否可以注册
    if (state.type === "student") {
      props.studentRegister(state);
    } else if (state.type === "admin") {
      props.adminRegister(state);
    } else {
      props.teacherRegister(state);
    }
  };
  // 点击注册调用

  const toLogin = () => {
    props.history.replace("/login");
  };

  const { msg, redirectTo } = props.user;
  // // 如果redirectTo有值, 就需要重定向到指定的路由 从reducer获取
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }
  const validateMessages = {
    required: "账号或密码必须填写!",
  };
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
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item>
            {msg ? <span className="errorMsg">{msg}</span> : null}
            <div className="login-form-title">用户注册</div>
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "密码不允许少于6位大于11位",

                min: 6,
                max: 11,
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
                message: "密码不允许少于6位大于11位",

                min: 6,
                max: 11,
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
                message: "密码不允许少于6位大于11位",

                min: 6,
                max: 11,
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
          <Form.Item name="type">
            <Radio.Group>
              <Radio value="admin">教务员</Radio>
              <Radio value="student">学生</Radio>
              <Radio value="teacher">老师</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
            </Button>
            <div
              className="login-form-registerLogin"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <a onClick={toLogin}>已是账号---请点击登入!</a>
            </div>

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

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ user: state.user }),
  //  函数确定
  { adminRegister, teacherRegister, studentRegister }
)(Register);
