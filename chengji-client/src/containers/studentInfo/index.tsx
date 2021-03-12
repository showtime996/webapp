//学生信息完善的路由容器组件

import React, { useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import styles from "@/assets/css/global.module.less";
import GlobalTab from "@/components/tabNav";
import selfStyles from "./index.module.less";
import { updateStudent } from "../../redux/actions";

function StudentInfo(props: {
  updateStudent: (arg0: {
    realName: string;
    sex: string;
    affiliation: string;
    age: string;
    startDate: string;
    endDate: string;
    nation: string;
    cname: string;
    classno: string;
    region: string;
    phone: string;
    department: string;
    IDcard: string;
    recommend: string;
    eMail: string;
    street: string;
    address: string;
  }) => void;
  user: { IDcard: any; type: any };
}) {
  const [state, setState] = useState({
    realName: "",
    sex: "",
    affiliation: "",
    age: "",
    startDate: "",
    endDate: "",
    cname: "",
    classno: "",

    nation: "",
    region: "",
    phone: "",
    IDcard: "",
    recommend: "",
    department: "",
    eMail: "",
    street: "",
    address: "",
  });

  const onFinish = (values: any) => {
    setState({
      realName: (state.realName = values.realName),
      sex: (state.sex = values.sex),
      affiliation: (state.affiliation = values.affiliation),
      cname: (state.cname = values.cname),
      classno: (state.classno = values.classno),
      age: (state.age = values.age),
      startDate: (state.startDate = values.startDate),
      endDate: (state.endDate = values.endDate),
      region: (state.region = values.region),
      phone: (state.phone = values.phone),
      nation: (state.nation = values.nation),
      department: (state.department = values.department),
      IDcard: (state.IDcard = values.IDcard),
      recommend: (state.recommend = values.recommend),
      eMail: (state.eMail = values.eMail),
      street: (state.street = values.street),
      address: (state.address = values.address),
    });
    props.updateStudent(state);
  };

  // 如果信息已经完善, 自动重定向到对应主界面
  const { IDcard, type } = props.user;
  if (IDcard) {
    // 说明信息已经完善
    const path = type === "student" ? "/student" : "/studentInfo";
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
            <h2 className={selfStyles.title}>学生基本信息</h2>
          </Form.Item>
          <Form.Item
            name={"realName"}
            label="真实姓名"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name={"sex"} label=" 性别：" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="man">男</Radio>
              <Radio value="women">女</Radio>
            </Radio.Group>
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
            rules={[{ type: "number", min: 1, max: 100, required: true }]}
          >
            <InputNumber placeholder="年龄" />
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
          <Form.Item name={"startDate"} label="开学日期">
            <Input placeholder="根据系统时间" />
          </Form.Item>
          {/* 系统获取时间 */}
          <Form.Item name={"endDate"} label="毕业日期">
            <Input placeholder="根据系统时间" />
          </Form.Item>
          <Form.Item name={"nation"} label="民族" rules={[{ required: true }]}>
            <Input placeholder="请输入民族" />
          </Form.Item>
          <Form.Item label="班级名">
            <Input.Group compact>
              <Form.Item name={"cname"} noStyle>
                <Select placeholder="请选择班级名">
                  <Option value="wlgc">网络工程</Option>
                  <Option value="jsjjj">计算机技术</Option>
                  <Option value="dzxxgc">电子信息工程</Option>
                  <Option value="rgzn">人工智能</Option>
                  <Option value="jzx">建筑学</Option>
                  <Option value="tmgc">土木工程</Option>
                  <Option value="gcgl">工程管理</Option>
                  <Option value="ah">交通工程</Option>
                  <Option value="jtgc">材料成型及控制工程</Option>
                  <Option value="clgc">车辆工程</Option>
                  <Option value="hxgcygy">化学工程与工艺</Option>
                  <Option value="yqcygc">油气储运工程</Option>
                  <Option value="clwl">材料物理</Option>
                  <Option value="yyhx">应用化学</Option>
                  <Option value="jrgc">金融工程</Option>
                  <Option value="yytjx">应用统计学</Option>
                  <Option value="wlgl">物流管理</Option>
                  <Option value="kjx">会计学</Option>
                  <Option value="gjjjywy">国际经济与贸易</Option>
                  <Option value="yy">英语</Option>
                  <Option value="ry">日语</Option>
                  <Option value="dy">德语</Option>
                  <Option value="gysj">工业设计</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={"classno"}
                label="班级"
                noStyle
                rules={[{ required: true, message: "班级信息必须输入！" }]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="请输入班级信息例如：网络194"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item label="籍贯">
            <Input.Group compact>
              <Form.Item name={"region"} noStyle>
                <Select placeholder="请选择省份">
                  <Option value="hb">河北</Option>
                  <Option value="sx">山西</Option>
                  <Option value="ln">辽宁</Option>
                  <Option value="jl">吉林</Option>
                  <Option value="hlj">黑龙江</Option>
                  <Option value="js">江苏</Option>
                  <Option value="zj">浙江</Option>
                  <Option value="ah">安徽</Option>
                  <Option value="fj">福建</Option>
                  <Option value="jx">江西</Option>
                  <Option value="sd">山东</Option>
                  <Option value="hna">河南</Option>
                  <Option value="hb">湖北</Option>
                  <Option value="hnb">湖南</Option>
                  <Option value="gd">广东</Option>
                  <Option value="hnc">海南</Option>
                  <Option value="sc">四川</Option>
                  <Option value="gz">贵州</Option>
                  <Option value="nmg">内蒙古</Option>
                  <Option value="gx">广西壮族</Option>
                  <Option value="xz">西藏</Option>
                  <Option value="nx">宁夏回族</Option>
                  <Option value="xj">新疆维吾尔</Option>
                  <Option value="bj">北京</Option>
                  <Option value="tj">天津</Option>
                  <Option value="sh">上海</Option>
                  <Option value="cq">重庆</Option>
                  <Option value="xg">香港</Option>
                  <Option value="am">澳门</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={"street"}
                label="地区"
                noStyle
                rules={[{ required: true, message: "地区信息必须输入！" }]}
              >
                <Input style={{ width: "50%" }} placeholder="请输入地区信息" />
              </Form.Item>
            </Input.Group>
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
          <Form.Item name={"recommend"} label="自我简介">
            <Input.TextArea
              placeholder="请输入自我简介"
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
//updateUser
export default connect((state: RootStateOrAny) => ({ user: state.user }), {
  updateStudent,
})(StudentInfo);
