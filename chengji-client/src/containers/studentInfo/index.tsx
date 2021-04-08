//学生信息完善的路由容器组件

import React, { useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import styles from "@/assets/css/global.module.less";
import GlobalTab from "@/components/tabNav";
import selfStyles from "./index.module.less";
import { updateStudent } from "../../redux/actions";
import { LikeOutlined } from "@ant-design/icons";
function StudentInfo(props: {
  updateStudent: (arg0: {
    realName: string;
    sex: string;
    affiliation: string;
    age: string;
    years: string;
    term: string;
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
    years: "",
    term: "",
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
  const [seletdata, setselectdata] = useState();
  const [deparmentdata, setdeparmentdata] = useState();

  const onFinish = (values: any) => {
    setState({
      realName: (state.realName = values.realName),
      sex: (state.sex = values.sex),
      affiliation: (state.affiliation = values.affiliation),
      cname: (state.cname = values.cname),
      classno: (state.classno = values.classno),
      age: (state.age = values.age),

      region: (state.region = values.region),
      phone: (state.phone = values.phone),
      nation: (state.nation = values.nation),
      department: (state.department = values.department),
      IDcard: (state.IDcard = values.IDcard),
      recommend: (state.recommend = values.recommend),
      eMail: (state.eMail = values.eMail),
      street: (state.street = values.street),
      address: (state.address = values.address),
      years: (state.years = values.years),
      term: (state.term = values.term),
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
  const cnameselect = (e) => {
    setselectdata(e);
  };
  const deparmentselect = (e) => {
    setdeparmentdata(e);
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
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={"department"}
            label="学院"
            hasFeedback
            rules={[{ required: true, message: "请选择学院" }]}
          >
            <Select onChange={deparmentselect} placeholder="请选择学院">
              <Option value="电子信息与工程学院">电子信息与工程学院</Option>
              <Option value="建筑工程学院">建筑工程学院</Option>
              <Option value="机械工程学院">机械工程学院</Option>
              <Option value="交通学院">交通学院</Option>
              <Option value="化学工程学院">化学工程学院</Option>
              <Option value="材料学院">材料学院</Option>
              <Option value="理学院">理学院</Option>
            </Select>
          </Form.Item>
          <Form.Item label="学年">
            <Input.Group compact>
              <Form.Item name={"years"} noStyle>
                <Select placeholder="请选择">
                  <Option value="20202021">2020-2021</Option>
                  <Option value="20192020">2019-2020</Option>
                  <Option value="20182019">2018-2019</Option>
                </Select>
              </Form.Item>
              <Form.Item name={"term"} label="学期" noStyle>
                <Select placeholder="请选择班级">
                  <Option value="第一学期">第一学期</Option>
                  <Option value="第二学期">第二学期</Option>
                  <Option value="第三学期">第三学期</Option>
                </Select>
              </Form.Item>
            </Input.Group>
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

          <Form.Item name={"nation"} label="民族" rules={[{ required: true }]}>
            <Input placeholder="请输入民族" />
          </Form.Item>

          <Form.Item label="专业名">
            <Input.Group compact>
              {deparmentdata === "电子信息与工程学院" && (
                <Form.Item name={"cname"} noStyle>
                  <Select onChange={cnameselect} placeholder="请选择专业名">
                    <Option value="网络工程">网络工程</Option>
                    <Option value="计算机技术">计算机技术</Option>
                    <Option value="电子信息工程">电子信息工程</Option>
                    <Option value="人工智能">人工智能</Option>
                  </Select>
                </Form.Item>
              )}
              {deparmentdata === "建筑工程学院" && (
                <Form.Item name={"cname"} noStyle>
                  <Select onChange={cnameselect} placeholder="请选择专业名">
                    <Option value="建筑学">建筑学</Option>
                    <Option value="土木工程">土木工程</Option>
                    <Option value="工程管理">工程管理</Option>
                    <Option value="交通工程">交通工程</Option>
                  </Select>
                </Form.Item>
              )}
              {deparmentdata === "机械工程学院" && (
                <Form.Item name={"cname"} noStyle>
                  <Select onChange={cnameselect} placeholder="请选择专业名">
                    <Option value="材料成型及控制工程">
                      材料成型及控制工程
                    </Option>
                    <Option value="车辆工程">车辆工程</Option>
                    <Option value="化学工程与工艺">化学工程与工艺</Option>
                    <Option value="油气储运工程">油气储运工程</Option>
                  </Select>
                </Form.Item>
              )}
              {deparmentdata === "交通学院" && (
                <Form.Item name={"cname"} noStyle>
                  <Select onChange={cnameselect} placeholder="请选择专业名">
                    <Option value="金融工程">金融工程</Option>
                    <Option value="会计学">会计学</Option>
                    <Option value="国际经济与贸易">国际经济与贸易</Option>
                  </Select>
                </Form.Item>
              )}
              {deparmentdata === "化学工程学院" && (
                <Form.Item name={"cname"} noStyle>
                  <Select onChange={cnameselect} placeholder="请选择专业名">
                    <Option value="应用统计学">应用统计学</Option>
                    <Option value="物流管理">物流管理</Option>
                    <Option value="材料物理">材料物理</Option>
                    <Option value="应用化学">应用化学</Option>
                  </Select>
                </Form.Item>
              )}
              {deparmentdata === "材料学院" && (
                <Form.Item name={"cname"} noStyle>
                  <Select onChange={cnameselect} placeholder="请选择专业名">
                    <Option value="英语">英语</Option>
                    <Option value="日语">日语</Option>
                    <Option value="德语">德语</Option>
                  </Select>
                </Form.Item>
              )}
              {deparmentdata === "理学院" && (
                <Form.Item name={"cname"} noStyle>
                  <Select onChange={cnameselect} placeholder="请选择专业名">
                    <Option value="工业设计">工业设计</Option>
                  </Select>
                </Form.Item>
              )}

              <Form.Item
                name={"classno"}
                label="班级"
                noStyle
                rules={[{ required: true, message: "班级信息必须输入！" }]}
              >
                <Select placeholder="请选择班级">
                  <Option value={seletdata + "1"}>{seletdata + "1"}</Option>
                  <Option value={seletdata + "2"}>{seletdata + "2"}</Option>
                  <Option value={seletdata + "3"}>{seletdata + "3"}</Option>
                </Select>
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
            <Button type="primary" icon={<LikeOutlined />} htmlType="submit">
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
