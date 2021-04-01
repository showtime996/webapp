//学生信息完善的路由容器组件

import React, { useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import styles from "@/assets/css/global.module.less";
import GlobalTab from "@/components/tabNav";
import selfStyles from "./index.module.less";
import { addGrade } from "@/redux/actions";
function AddDetail() {
  const [state, setState] = useState({
    username: "",
    realName: "",
    courseNo: "",
    classno: "",
    credit: "",
    courseType: "",
    courseName: "",
    grade: Number,
    cheat: "",
  });
  const [seletdata, setselectdata] = useState();
  const [deparmentdata, setdeparmentdata] = useState();
  const onFinish = (values: any) => {
    setState({
      username: (state.username = values.username),
      realName: (state.realName = values.realName),
      courseNo: (state.courseNo = values.courseNo),
      classno: (state.classno = values.classno),
      credit: (state.credit = values.credit),
      courseType: (state.courseType = values.courseType),
      courseName: (state.courseName = values.courseName),
      grade: (state.grade = values.grade),
      cheat: (state.cheat = values.cheat),
    });

    // props.addGrade(state);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", values);
  };

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

  return (
    <Form
      {...layout}
      style={{ margin: "17px auto" }}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
     
      <Form.Item name={"username"} label="学号" rules={[{ required: true }]}>
        <Input placeholder="请输入学号" />
      </Form.Item>
      <Form.Item name={"realName"} label="姓名" rules={[{ required: true }]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item
        name={"classno"}
        label="班级"
        rules={[{ required: true, message: "班级信息必须输入！" }]}
      >
        <Select placeholder="请选择专业名">
          <Option value={seletdata + "1"}>{seletdata + "1"}</Option>
          <Option value={seletdata + "2"}>{seletdata + "2"}</Option>
          <Option value={seletdata + "3"}>{seletdata + "3"}</Option>
        </Select>
      </Form.Item>
      <Form.Item name={"courseNo"} label="课程号" rules={[{ required: true }]}>
        <Input placeholder="请输入课程号" />
      </Form.Item>
      <Form.Item
        name={"courseName"}
        label="课程名称"
        rules={[{ required: true }]}
      >
        <Input placeholder="请输入课程名称" />
      </Form.Item>
      <Form.Item name={"courseType"} label="课程类型">
        <Select placeholder="请选择">
          <Option value="公共课">公共课</Option>
          <Option value="选修课">选修课</Option>
          <Option value="必修课">必修课</Option>
          <Option value="辅修课">辅修课</Option>
        </Select>
      </Form.Item>
      <Form.Item name={"grade"} label="成绩">
        <InputNumber style={{ width: 435}} placeholder="请输入成绩" />
      </Form.Item>
      <Form.Item name={"credit"} label="学分">
        <Select placeholder="请选择">
          <Option value="1.0">1.0</Option>
          <Option value="1.5">1.5</Option>
          <Option value="2.0">2.0</Option>
          <Option value="2.5">2.5</Option>
          <Option value="3.0">3.0</Option>
        </Select>
      </Form.Item>
      <Form.Item name={"cheat"} label="作弊">
        <Select placeholder="请选择">
          <Option value="作弊">作弊</Option>
          <Option value="正常">正常</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Button type="primary" htmlType="submit">
          信息提交
        </Button>
      </Form.Item>
    </Form>
  );
}

//updateUser
export default connect((state: RootStateOrAny) => ({ user: state.user }), {
  addGrade,
})(AddDetail);
