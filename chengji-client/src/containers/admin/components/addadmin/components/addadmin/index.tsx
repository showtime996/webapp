//管理员注册的路由组件
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "@/assets/css/loginForm.less";
import bj from "@/assets/css/bj.module.less";
import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// 通过异步action实现交互后台的数据 普通的ui不能得使用函数方式
import { connect, RootStateOrAny } from "react-redux";
// 引入重定向路由
import { Redirect } from "react-router-dom";
import { adminRegister } from "@/redux/actions";
function AdminRegister(props) {
  const [state, setState] = useState({
    username: "", // 用户名
    password: "", // 密码
    password2: "", // 确认密码
    type: "admin",
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
      type: state.type,
    });
    props.adminRegister(state);
  };
  // 点击注册调用
  const { msg, redirectTo } = props.user;
  // // 如果redirectTo有值, 就需要重定向到指定的路由 从reducer获取
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }
  const validateMessages = {
    required: "账号或密码必须填写!",
  };

  return (
    <Form onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "账号不允许少于6位大于11位",

            min: 6,
            max: 11,
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          // onChange={val => { this.handleChange('username', val) }}
          placeholder="账号"
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
      {JSON.stringify(msg) != "{}" && msg !== "用户名或密码不正确!" ? (
        <span className="errorMsg">{msg}</span>
      ) : (
        JSON.stringify(msg) != "{}" && (
          <span style={{ color: "green", fontWeight: "bold" }}>录入成功！</span>
        )
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ user: state.user }),
  //  函数确定
  { adminRegister }
)(AdminRegister);
