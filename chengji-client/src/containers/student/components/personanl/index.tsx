//学生信息完善的路由容器组件

import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import styles from "@/assets/css/global.module.less";
import Cookies from "js-cookie";
import { LikeOutlined, ReloadOutlined } from "@ant-design/icons";
import { updateStudent, StudentUserid } from "@/redux/actions";
const cookicedata: any = [];
function StudentPerson(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    realName: "",
    sex: "",
    age: "",
    affiliation: "",
    IDcard: "",
    cname: "",
    classno: "",
    years: "",
    term: "",
    department: "",
    nation: "",
    region: "",
    phone: "",
    eMail: "",
    street: "",
    address: "",
    recommend: "",
  });
  const userid = Cookies.get("userid");
  useEffect(() => {
    props.StudentUserid({ id: userid });
  }, []);
  const cookiceuserid = props.cooikeuserid;
  const cookicelength = cookiceuserid.length;
  if (JSON.stringify(cookiceuserid) !== "{}") {
    for (let i = cookicedata.length; i < cookicelength; i++) {
      cookicedata.push({
        key: i + 1,
        username: cookiceuserid[i].username,
        password: cookiceuserid[i].password,
        realName: cookiceuserid[i].realName,
        age: cookiceuserid[i].age,
        sex: cookiceuserid[i].sex,
        affiliation: cookiceuserid[i].affiliation,
        IDcard: cookiceuserid[i].IDcard,
        cname: cookiceuserid[i].cname,
        classno: cookiceuserid[i].classno,
        years: cookiceuserid[i].years,
        term: cookiceuserid[i].term,
        department: cookiceuserid[i].department,
        nation: cookiceuserid[i].nation,
        region: cookiceuserid[i].region,
        phone: cookiceuserid[i].phone,
        eMail: cookiceuserid[i].eMail,
        street: cookiceuserid[i].street,
        address: cookiceuserid[i].address,
        recommend: cookiceuserid[i].recommend,
      });
    }
  }
  const [seletdata, setselectdata] = useState();
  const [deparmentdata, setdeparmentdata] = useState();
  const onFinish = (values: any) => {
    setState({
      username: (state.username = cookicedata[0].username),
      password: (state.password = values.password || cookicedata[0].password),
      realName: (state.realName = cookicedata[0].realName),
      sex: (state.sex = cookicedata[0].sex),
      affiliation: (state.affiliation = cookicedata[0].affiliation),
      IDcard: (state.IDcard = cookicedata[0].IDcard),
      cname: (state.cname = cookicedata[0].cname),
      classno: (state.classno = cookicedata[0].classno),
      years: (state.years = cookicedata[0].years),
      age: (state.age = cookicedata[0].age),
      term: (state.term = cookicedata[0].term),
      department: (state.department = cookicedata[0].department),
      nation: (state.nation = cookicedata[0].nation),
      region: (state.region = values.region || cookicedata[0].region),
      phone: (state.phone = values.phone || cookicedata[0].phone),
      eMail: (state.eMail = values.eMail || cookicedata[0].eMail),
      street: (state.street = values.street || cookicedata[0].street),
      address: (state.address = values.address || cookicedata[0].address),
      recommend: (state.recommend =
        values.recommend || cookicedata[0].recommend),
    });
    console.log("values", state);

    props.updateStudent(state);
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
          style={{
            margin: "17px auto",
          }}
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
          <Form.Item name={"years"} label="学年">
            {cookicedata[0].years}
          </Form.Item>
          <Form.Item name={"term"} label="学期">
            {cookicedata[0].term}
          </Form.Item>
          <Form.Item name={"department"} label="学院" hasFeedback>
            {cookicedata[0].department}
          </Form.Item>
          <Form.Item name={"cname"} label="专业名" hasFeedback>
            {cookicedata[0].cname}
          </Form.Item>
          <Form.Item name={"classno"} label="班级" hasFeedback>
            {cookicedata[0].classno}
          </Form.Item>
          <Form.Item name={"nation"} label="民族" hasFeedback>
            {cookicedata[0].nation}
          </Form.Item>

          <Form.Item label="籍贯">
            <Input.Group compact>
              <Form.Item name={"region"} noStyle>
                <Select
                  style={{ width: 310 }}
                  defaultValue={cookicedata[0].region}
                >
                  <Option value="河北">河北</Option>
                  <Option value="山西">山西</Option>
                  <Option value="辽宁">辽宁</Option>
                  <Option value="吉林">吉林</Option>
                  <Option value="黑龙江">黑龙江</Option>
                  <Option value="江苏">江苏</Option>
                  <Option value="浙江">浙江</Option>
                  <Option value="安徽">安徽</Option>
                  <Option value="福建">福建</Option>
                  <Option value="江西">江西</Option>
                  <Option value="山东">山东</Option>
                  <Option value="河南">河南</Option>
                  <Option value="湖北">湖北</Option>
                  <Option value="湖南">湖南</Option>
                  <Option value="广东">广东</Option>
                  <Option value="海南">海南</Option>
                  <Option value="四川">四川</Option>
                  <Option value="贵州">贵州</Option>
                  <Option value="内蒙古">内蒙古</Option>
                  <Option value="广西壮族">广西壮族</Option>
                  <Option value="西藏">西藏</Option>
                  <Option value="宁夏回族">宁夏回族</Option>
                  <Option value="新疆维吾尔">新疆维吾尔</Option>
                  <Option value="北京">北京</Option>
                  <Option value="天津">天津</Option>
                  <Option value="上海">上海</Option>
                  <Option value="重庆">重庆</Option>
                  <Option value="香港">香港</Option>
                  <Option value="澳门">澳门</Option>
                </Select>
              </Form.Item>
              <Form.Item name={"street"} label="地区" noStyle>
                <Input
                  style={{ width: "50%" }}
                  defaultValue={cookicedata[0].street}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item name={"phone"} label="手机号码">
            <Input defaultValue={cookicedata[0].phone} />
          </Form.Item>
          <Form.Item name={"eMail"} label="Email">
            <Input defaultValue={cookicedata[0].eMail} />
          </Form.Item>

          <Form.Item name={"address"} label="家庭地址">
            <Input.TextArea
              defaultValue={cookicedata[0].address}
              style={{ resize: "none" }}
            />
          </Form.Item>
          <Form.Item name={"recommend"} label="个人简介">
            <Input.TextArea
              defaultValue={cookicedata[0].recommend}
              style={{ resize: "none" }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<LikeOutlined />}
              onClick={refresh}
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
    updateStudent,
    StudentUserid,
  }
)(StudentPerson);
