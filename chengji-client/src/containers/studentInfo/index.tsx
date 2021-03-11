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
  updateUser: (arg0: {
    realName: string;
    sex: string;
    affiliation: string;
    age: string;
    startDate: string;
    endDate: string;
    nation: string;
    region: string;
    phone: string;
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
    nation: "",
    region: "",
    phone: "",
    IDcard: "",
    recommend: "",
    eMail: "",
    street: "",
    address: "",
  });

  const onFinish = (values: any) => {
    console.log(values);
    props.updateUser(state);
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
export default connect((state:RootStateOrAny) => ({ user: state.user }), { updateStudent })(
  StudentInfo
);
