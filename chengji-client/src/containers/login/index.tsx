
import React, { useState } from "react";
import "antd/dist/antd.css";
import "@/assets/css/loginForm.less";
import bj from "@/assets/css/bj.module.less";
import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// 引入重定向路由
import { Redirect } from "react-router-dom";
// 通过异步action实现交互后台的数据 普通的ui不能得使用函数方式
import { connect, RootStateOrAny } from "react-redux";
import { adminLogin, studentLogin, teacherLogin } from "../../redux/actions";
import { Carousel } from "antd";
const contentStyle: any = {
  height: "100%",
  color: "#fff",
  lineHeight: "100%",
  textAlign: "center",
  background: "#364d79",
};
function Login(props: any) {
  const [state, setState] = useState({
    username: "", // 用户名
    password: "", // 密码
    type: "",
  });

  // 点击注册调用  将值传入到state中
  const onFinish = (values: {
    username: string;
    password: string;
    type: string;
  }) => {
    setState({
      username: (state.username = values.username),
      password: (state.password = values.password),
      type: (state.type = values.type),
    });
    //调用redux action中的login方法，判断是否可以注册

    if (state.type === "student") {
      props.studentLogin(state);
    } else if (state.type === "admin") {
      props.adminLogin(state);
    } else {
      props.teacherLogin(state);
    }
  };

  // const toRegister = () => {
  //   props.history.replace("/register");
  // };

  const { msg, redirectTo } = props.user;
  // // 如果redirectTo有值, 就需要重定向到指定的路由 从reducer获取
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div>
      <Carousel autoplay effect="fade">
        <div>
          <h3 style={contentStyle}>
            <div className={bj.logo}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
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
                <Form.Item name="type">
                  <Radio.Group>
                    <Radio value="admin">管理员</Radio>
                    <Radio value="student">学生</Radio>
                    <Radio value="teacher">教师</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入
                  </Button>

                  <p
                    className="login-form-registerLogin"
                    style={{ marginTop: "10px" }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;欢迎点击登入！
                    {/* <a onClick={toRegister}>请点击注册!</a> */}
                  </p>

                  <div
                    className="login-form-registerLogin"
                    style={{
                      backgroundColor: "#CCC",
                      width: "100%",
                      height: "42px",
                      position: "absolute",
                      bottom: "-26px",
                    }}
                  >
                    <span className="login-form-registerLogin-txt">
                      温馨提示:
                    </span>
                    学生学号老师职工号管理员教工号！
                  </div>
                </Form.Item>
              </Form>
            </div>
          </h3>
        </div>

        <div>
          <h3 style={contentStyle}>
            <div className={bj.logo1}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
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
                <Form.Item name="type">
                  <Radio.Group>
                    <Radio value="admin">管理员</Radio>
                    <Radio value="student">学生</Radio>
                    <Radio value="teacher">教师</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入
                  </Button>

                  <p
                    className="login-form-registerLogin"
                    style={{ marginTop: "10px" }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;欢迎点击登入！
                    {/* <a onClick={toRegister}>请点击注册!</a> */}
                  </p>

                  <div
                    className="login-form-registerLogin"
                    style={{
                      backgroundColor: "#CCC",
                      width: "100%",
                      height: "42px",
                      position: "absolute",
                      bottom: "-26px",
                    }}
                  >
                    <span className="login-form-registerLogin-txt">
                      温馨提示:
                    </span>
                    学生学号老师职工号管理员教工号！
                  </div>
                </Form.Item>
              </Form>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className={bj.logo2}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
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
                <Form.Item name="type">
                  <Radio.Group>
                    <Radio value="admin">管理员</Radio>
                    <Radio value="student">学生</Radio>
                    <Radio value="teacher">教师</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入
                  </Button>

                  <p
                    className="login-form-registerLogin"
                    style={{ marginTop: "10px" }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;欢迎点击登入！
                    {/* <a onClick={toRegister}>请点击注册!</a> */}
                  </p>

                  <div
                    className="login-form-registerLogin"
                    style={{
                      backgroundColor: "#CCC",
                      width: "100%",
                      height: "42px",
                      position: "absolute",
                      bottom: "-26px",
                    }}
                  >
                    <span className="login-form-registerLogin-txt">
                      温馨提示:
                    </span>
                    学生学号老师职工号管理员教工号！
                  </div>
                </Form.Item>
              </Form>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <div className={bj.logo3}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
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
                <Form.Item name="type">
                  <Radio.Group>
                    <Radio value="admin">管理员</Radio>
                    <Radio value="student">学生</Radio>
                    <Radio value="teacher">教师</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入
                  </Button>

                  <p
                    className="login-form-registerLogin"
                    style={{ marginTop: "10px" }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;欢迎点击登入！
                    {/* <a onClick={toRegister}>请点击注册!</a> */}
                  </p>

                  <div
                    className="login-form-registerLogin"
                    style={{
                      backgroundColor: "#CCC",
                      width: "100%",
                      height: "42px",
                      position: "absolute",
                      bottom: "-26px",
                    }}
                  >
                    <span className="login-form-registerLogin-txt">
                      温馨提示:
                    </span>
                    学生学号老师职工号管理员教工号！
                  </div>
                </Form.Item>
              </Form>
            </div>
          </h3>
        </div>
      </Carousel>
    </div>
  );
}

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({ user: state.user }),
  //  函数确定
  { adminLogin, studentLogin, teacherLogin }
)(Login);
