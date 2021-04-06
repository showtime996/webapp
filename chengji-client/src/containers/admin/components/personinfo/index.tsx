//学生信息完善的路由容器组件

import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import styles from "@/assets/css/global.module.less";
import Cookies from "js-cookie";
import { LikeOutlined, ReloadOutlined } from "@ant-design/icons";
import { updateAdmin, AdminUserid } from "@/redux/actions";
const cookicedata: any = [];
function AdminPerson(props) {
  const [state, setState] = useState({
    realName: "",
    affiliation: "",
    sex: "",
    age: "",

    duty: "",
    IDcard: "",

    department: "",

    phone: "",
    eMail: "",

    diploma: "",
    username: "",
    password: "",
  });
  const userid = Cookies.get("userid");
  useEffect(() => {
    props.AdminUserid({ id: userid });
  }, []);
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
        sex: cookiceuserid[i].sex,
        affiliation: cookiceuserid[i].affiliation,
        age: cookiceuserid[i].age,
        department: cookiceuserid[i].department,
        duty: cookiceuserid[i].duty,
        IDcard: cookiceuserid[i].IDcard,
        diploma: cookiceuserid[i].diploma,
        phone: cookiceuserid[i].phone,
        eMail: cookiceuserid[i].eMail,
      });
    }
  }
  const [seletdata, setselectdata] = useState();
  const [deparmentdata, setdeparmentdata] = useState();
  const onFinish = (values: any) => {
    setState({
      username: (state.username = cookicedata[0].username),
      realName: (state.realName = cookicedata[0].realName),
      affiliation: (state.affiliation = cookicedata[0].affiliation),
      age: (state.age = cookicedata[0].age),
      sex: (state.sex = cookicedata[0].sex),
      password: (state.password = values.password || cookicedata[0].password),
      diploma: (state.diploma = cookicedata[0].diploma),
      duty: (state.duty = values.duty || cookicedata[0].duty),

      phone: (state.phone = values.phone || cookicedata[0].phone),
      IDcard: (state.IDcard = cookicedata[0].IDcard),
      eMail: (state.eMail = values.eMail || cookicedata[0].eMail),
      department: (state.department = cookicedata[0].department),
    });
    console.log("values", state);

    props.updateAdmin(state);
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

  const refresh = () => {
    window.history.go(0);
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form
          {...layout}
          style={{ margin: "17px auto" }}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name={"username"} label="学号">
            {cookicedata[0].username}
          </Form.Item>
          <Form.Item name={"realName"} label="真实姓名">
            {cookicedata[0].realName}
          </Form.Item>
          <Form.Item name={"sex"} label=" 性别：">
            {cookicedata[0].sex}
          </Form.Item>
          <Form.Item name={"password"} label="密码">
            <Input defaultValue={cookicedata[0].password} />
          </Form.Item>
          <Form.Item name={"affiliation"} label="政治面貌">
            {cookicedata[0].affiliation === "DY" ? "党员" : "群众"}
          </Form.Item>
          <Form.Item name={"age"} label="年龄">
            {cookicedata[0].age}
          </Form.Item>

          <Form.Item name={"department"} label="学院" hasFeedback>
            {cookicedata[0].department}
          </Form.Item>
          <Form.Item name={"diploma"} label="学历" hasFeedback>
            {cookicedata[0].diploma}
          </Form.Item>

          <Form.Item name={"IDcard"} label="身份证号码">
            {cookicedata[0].IDcard}
          </Form.Item>

          <Form.Item name={"phone"} label="手机号码">
            <Input defaultValue={cookicedata[0].phone} />
          </Form.Item>
          <Form.Item name={"eMail"} label="Email">
            <Input defaultValue={cookicedata[0].eMail} />
          </Form.Item>

          <Form.Item name={"duty"} label="职责">
            <Input.TextArea
              defaultValue={cookicedata[0].duty}
              style={{ resize: "none" }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={refresh}
              icon={<LikeOutlined />}
              style={{ marginRight: 30 }}
            >
              信息更改
            </Button>
            <Button type="primary" icon={<ReloadOutlined />} onClick={refresh}>
              刷新
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

//updateUser
export default connect(
  (state: RootStateOrAny) => ({
    user: state.user,
    cooikeuserid: state.cooikeuserid,
  }),
  {
    updateAdmin,
    AdminUserid,
  }
)(AdminPerson);
