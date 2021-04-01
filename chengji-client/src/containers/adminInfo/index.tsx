//学生信息完善的路由容器组件

import React, { useState } from "react";
import {
  connect,
  DefaultRootState,
  RootStateOrAny,
  useSelector,
} from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import styles from "@/assets/css/global.module.less";
import GlobalTab from "@/components/tabNav/index.tsx";
import selfStyles from "./index.module.less";
import { updateAdmin } from "../../redux/actions";

function AdminInfo(props: {
  user: { IDcard: any; type: any };
  updateAdmin: (arg0: {
    realName: string;
    affiliation: string;
    age: string;

    phone: string;
    IDcard: string;
    eMail: string;
    diploma: string;
    department: string;
    duty: string;
  }) => void;
}) {
  const [state, setState] = useState({
    realName: "",
    affiliation: "",
    age: "",
    diploma: "",
    phone: "",
    IDcard: "",
    eMail: "",

    department: "",
    duty: "",
  });

  // 如果信息已经完善, 自动重定向到对应主界面
  const { IDcard, type } = props.user;
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

  const onFinish = (values: any) => {
    setState({
      realName: (state.realName = values.realName),
      affiliation: (state.affiliation = values.affiliation),
      age: (state.age = values.age),
      diploma: (state.diploma = values.diploma),
      phone: (state.phone = values.phone),
      IDcard: (state.IDcard = values.IDcard),
      eMail: (state.eMail = values.eMail),

      department: (state.department = values.department),
      duty: (state.duty = values.duty),
    });
    props.updateAdmin(state);
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
          <Form.Item name={"sex"} label=" 性别：" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
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
              <Option value="电子信息与工程学院">电子信息与工程学院</Option>
              <Option value="建筑工程学院">建筑工程学院</Option>
              <Option value="机械工程学院">机械工程学院</Option>
              <Option value="交通学院">交通学院</Option>
              <Option value="化学工程学院">化学工程学院</Option>
              <Option value="材料学院">材料学院</Option>
              <Option value="理学院">理学院</Option>
            </Select>
          </Form.Item>
          <Form.Item name={"diploma"} label="学历" hasFeedback>
            <Select placeholder="请输入你的学历">
              <Option value="博士">博士</Option>
              <Option value="研究生">研究生</Option>
              <Option value="本科">本科</Option>
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

export default connect((state: RootStateOrAny) => ({ user: state.user }), {
  updateAdmin,
})(AdminInfo);
