import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import Cookies from "js-cookie";
import { UpdateGradeData, TeacherUserid } from "@/redux/actions";
import { LikeOutlined } from "@ant-design/icons";
function UpdateGrade(props) {
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
    cname: "",
    department: "",
    courseteacher: "",
  });
  const userid = Cookies.get("userid");
  useEffect(() => {
    props.TeacherUserid({ id: userid });
  }, []);
  const cookicedata: any = [];
  const cookiceuserid = props.cooikeuserid;
  const cookicelength = cookiceuserid.length;
  if (JSON.stringify(cookiceuserid) !== "{}") {
    for (let i = cookicedata.length; i < cookicelength; i++) {
      cookicedata.push({
        key: i + 1,
        username: cookiceuserid[i].username,
        password: cookiceuserid[i].password,
        type: cookiceuserid[i].type,
        realName: cookiceuserid[i].realName,
        cname: cookiceuserid[i].cname,
        sex: cookiceuserid[i].sex,
        department: cookiceuserid[i].department,
        affiliation: cookiceuserid[i].affiliation,
        age: cookiceuserid[i].age,
        duty: cookiceuserid[i].duty,
        IDcard: cookiceuserid[i].IDcard,
        nation: cookiceuserid[i].nation,
        region: cookiceuserid[i].region,
        phone: cookiceuserid[i].phone,
        eMail: cookiceuserid[i].eMail,
        street: cookiceuserid[i].street,
        diploma: cookiceuserid[i].diploma,
      });
    }
  }
  const { tempdata } = props;

  const onFinish = async (values: any) => {
    setState({
      department: (state.department = tempdata.department),
      username: (state.username = tempdata.username),
      realName: (state.realName = tempdata.realName),
      cname: (state.cname = tempdata.cname),
      classno: (state.classno = tempdata.classno),
      courseNo: (state.courseNo = tempdata.courseNo),
      credit: (state.credit = values.credit || tempdata.credit),
      courseType: (state.courseType = values.courseType || tempdata.courseType),
      courseName: (state.courseName = values.courseName || tempdata.courseName),
      grade: (state.grade =
        values.cheat === "作弊" ? 0 : values.grade || tempdata.grade),
      cheat: (state.cheat = values.cheat || tempdata.cheat),
      courseteacher: (state.courseteacher = tempdata.courseteacher),
    });

    await props.UpdateGradeData(state);
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
  const btnclick = () => {
    window.history.go(0);
  };
  return (
    <Form
      {...layout}
      style={{ margin: "17px auto" }}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name={"username"} label="学号">
        <Input
          readOnly
          placeholder="请输入学号"
          defaultValue={tempdata.username}
          value={tempdata.username}
        />
      </Form.Item>
      <Form.Item name={"realName"} label="姓名">
        <Input
          readOnly
          placeholder="请输入姓名"
          defaultValue={tempdata.realName}
          value={tempdata.realName}
        />
      </Form.Item>
      <Form.Item name={"department"} label="学院">
        <Input
          readOnly
          placeholder="请输入学院"
          defaultValue={tempdata.department}
          value={tempdata.department}
        />
      </Form.Item>
      <Form.Item name={"courseteacher"} label="授课教师">
        <Input
          readOnly
          defaultValue={tempdata.courseteacher}
          value={tempdata.courseteacher}
        />
      </Form.Item>
      <Form.Item name={"cname"} label="专业">
        <Input
          readOnly
          placeholder="请输入专业"
          defaultValue={tempdata.cname}
          value={tempdata.cname}
        />
      </Form.Item>
      <Form.Item name={"classno"} label="班级">
        <Input
          readOnly
          placeholder="请输入班级"
          defaultValue={tempdata.classno}
          value={tempdata.classno}
        />
      </Form.Item>
      <Form.Item name={"courseNo"} label="课程号">
        <Input readOnly defaultValue={tempdata.courseNo} />
      </Form.Item>
      <Form.Item name={"courseName"} label="课程名称">
        <Input defaultValue={tempdata.courseName} />
      </Form.Item>
      <Form.Item name={"courseType"} label="课程类型">
        <Select defaultValue={tempdata.courseType}>
          <Option value="公共课">公共课</Option>
          <Option value="选修课">选修课</Option>
          <Option value="必修课">必修课</Option>
          <Option value="辅修课">辅修课</Option>
        </Select>
      </Form.Item>
      <Form.Item name={"grade"} label="成绩">
        <InputNumber style={{ width: 435 }} defaultValue={tempdata.grade} />
      </Form.Item>
      <Form.Item name={"credit"} label="学分">
        <Select defaultValue={tempdata.credit}>
          <Option value="1.0">1.0</Option>
          <Option value="1.5">1.5</Option>
          <Option value="2.0">2.0</Option>
          <Option value="2.5">2.5</Option>
          <Option value="3.0">3.0</Option>
        </Select>
      </Form.Item>
      <Form.Item name={"cheat"} label="作弊">
        <Select defaultValue={tempdata.cheat}>
          <Option value="作弊">作弊</Option>
          <Option value="正常">正常</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp;
        {cookicedata[0].realName === tempdata.courseteacher ? (
          <Button
            type="primary"
            icon={<LikeOutlined />}
            onClick={btnclick}
            htmlType="submit"
          >
            信息提交
          </Button>
        ) : (
          <Button disabled>信息提交</Button>
        )}
      </Form.Item>
    </Form>
  );
}

//updateUser
export default connect(
  (state: RootStateOrAny) => ({
    grade: state.grade,
    cooikeuserid: state.cooikeuserid,
  }),
  {
    UpdateGradeData,
    TeacherUserid,
  }
)(UpdateGrade);
