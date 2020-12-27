//学生信息完善的路由容器组件

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import styles from "@/assets/css/global.module.less";
import GlobalTab from "@/components/layout/global";
import selfStyles from "./index.module.less";
import { updateAdmin } from "@/redux/actions";

class AdminInfo extends Component {
  state = {
    realName: "",
    affiliation: "",
    age: "",
    startDate: "",
    phone: "",
    IDcard: "",
    eMail: "",
    address: "",
    department: "",
    duty: "",
  };

  render() {
    // 如果信息已经完善, 自动重定向到对应主界面
    const { IDcard, type } = this.props.user;
    if (IDcard) {
      // 说明信息已经完善
      const path = type === "admin" ? "/admin" : "/adminInfo";
      return <Redirect to={path} />;
    }
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    const { Option } = Select;
    const validateMessages = {
      required: "${label} 必须填写!",
      message: "请输入你的${label}!",
      len: "${label}长度必须18位",
      types: {
        email: "${label} 不是有效的邮箱!",
        number: "${label} 不是有效的数字!",
      },
      number: {
        range: "${label} 范围必须在${min} 和 ${max}",
      },
    };

    const onFinish = (values) => {
      this.setState({
        realName: (this.realName = values.realName),
        affiliation: (this.affiliation = values.affiliation),
        age: (this.age = values.age),
        startDate: (this.startDate = values.startDate),
        phone: (this.phone = values.phone),
        IDcard: (this.IDcard = values.IDcard),
        eMail: (this.eMail = values.eMail),
        address: (this.address = values.address),
        department: (this.department = values.department),
        duty: (this.duty = values.duty),
      });
      this.props.updateAdmin(this.state);
      console.log("Success:", values);
    };

    return (
      <div className={styles.container}>
        <GlobalTab></GlobalTab>
        <div className={styles.formContainer}>
          <Form
            {...layout}
            style={{ margin: "17px auto" }}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item>
              <h2 className={selfStyles.title}>教务员基本信息</h2>
            </Form.Item>
            <Form.Item name={"realName"} label="真实姓名">
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              name={"sex"}
              label=" 性别："
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value="man">男</Radio>
                <Radio value="women">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name={"affiliation"}
              label="政治面貌"
              hasFeedback
              rules={[{ required: true, message: "请输入你的政治面貌" }]}
            >
              <Select placeholder="请输入你的政治面貌">
                <Option value="DY">党员</Option>
                <Option value="TY">团员</Option>
                <Option value="SXDY">少先队员</Option>
                <Option value="QZ">群众</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"age"}
              label="年龄"
              rules={[{ type: "number", min: 1, max: 100 }]}
            >
              <InputNumber placeholder="年龄" />
            </Form.Item>

            <Form.Item
              name={"department"}
              label="学院"
              hasFeedback
              rules={[{ required: true, message: "请输入你负责的学院" }]}
            >
              <Select placeholder="请输入你负责的学院">
                <Option value="DXG">电子信息与工程学院</Option>
                <Option value="JZG">建筑工程学院</Option>
                <Option value="JXG">机械工程学院</Option>
                <Option value="JT">交通学院</Option>
                <Option value="HG">化学工程学院</Option>
                <Option value="CL">材料学院</Option>
                <Option value="LI">理学院</Option>
                <Option value="JIG">经济管理学院</Option>
                <Option value="WG">外国语学院</Option>
                <Option value="RW">人文学院</Option>
                <Option value="GJ">国际交流学院</Option>
                <Option value="CJ">成人教育学院</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={"IDcard"}
              label="身份证号码"
              rules={[
                {
                  required: true,
                  len: 18,
                  message: "请输入18位有效数字!",
                },
              ]}
            >
              <Input placeholder="请输入有效的身份证号码" />
            </Form.Item>
            {/* 系统获取时间 */}
            <Form.Item name={"startDate"} label="开始日期">
              <Input placeholder="根据系统时间" />
            </Form.Item>

            <Form.Item
              name={"phone"}
              label="手机号码"
              rules={[
                {
                  required: true,
                  len: 11,
                  message: "请输入11位有效数字!",
                },
              ]}
            >
              <Input placeholder="请输入手机号码" />
            </Form.Item>
            <Form.Item name={"eMail"} label="Email" rules={[{ type: "email" }]}>
              <Input placeholder="请输入电子邮箱" />
            </Form.Item>
            <Form.Item
              name={"address"}
              label="家庭地址"
              rules={[{ required: true, message: "家庭地址信息必须输入" }]}
            >
              <Input.TextArea
                placeholder="请输入家庭地址"
                style={{ resize: "none" }}
              />
            </Form.Item>
            <Form.Item name={"duty"} label="职责">
              <Input.TextArea
                placeholder="请输入职责"
                style={{ resize: "none" }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Button type="primary" htmlType="submit">
                信息提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { updateAdmin })(
  AdminInfo
);
