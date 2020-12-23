//学生信息完善的路由容器组件

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio } from "antd";
// import { updateUser } from "../../redux/actions";

class StudentInfo extends Component {
  state = {
    realName: "",
    affiliation: "",
    age: "",
    startDate: "",
    nation: "",
    region: "",
    phone: "",
    IDcard: "",
    recommend: "",
    eMail: "",
  };

  save = () => {
    this.props.updateUser(this.state);
  };

  render() {
    // 如果信息已经完善, 自动重定向到对应主界面
    // const { header, type } = this.props.user;
    // if (header) {
    //   // 说明信息已经完善
    //   const path = type === "dashen" ? "/dashen" : "/laoban";
    //   return <Redirect to={path} />;
    // }
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const validateMessages = {
      required: "${label} is required!",
      message: "Please select your ${label}!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    const onFinish = (values) => {
      console.log(values);
    };

    return (
      <div>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["realName", "name"]}
            label="真实姓名"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["sex", "sex"]} label=" 用户类型：">
            <Radio.Group>
              <Radio value="man">男</Radio>
              <Radio value="women">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="select"
            label="政治面貌"
            hasFeedback
            rules={[{ required: true, message: "请输入你的籍贯!" }]}
          >
            <Select placeholder="请输入你的籍贯!">
              <Option value="">浙江</Option>
              <Option value="usa"></Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "age"]}
            label="Age"
            rules={[{ type: "number", min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item name={["user", "introduction"]} label="Introduction">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

//updateUser
export default connect((state) => ({ user: state.user }), {})(StudentInfo);
