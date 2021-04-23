import { Button, Layout, Menu, Tooltip } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CalendarOutlined,
  MediumOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./index.less";
import TeacherPerson from "../person";

import Cookies from "js-cookie";
import GradeTable from "../gradetable";
import StuInfo from "@/containers/teacher/components/stuinfo";
import request from "umi-request";
import { connect, RootStateOrAny } from "react-redux";
const { Header, Sider, Content, Footer } = Layout;
const cookicedata: any = [];
function Teachers() {
  const [state, setState] = useState({
    collapsed: false,
  });
  const [clickkey, setclickkey] = useState("1");

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  const btnclearcookie = () => {
    Cookies.remove("userid");
  };
  const menuclick = (e) => {
    setclickkey(e.key);
  };
  const userid = Cookies.get("userid");
  const [requestdata, setrequestdata]: any = useState();
  useEffect(() => {
    request
      .post("teacheruserid", {
        data: {
          id: userid,
        },
      })
      .then(function (response) {
        setrequestdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        style={{ backgroundColor: "#fff" }}
        collapsed={state.collapsed}
      >
        <div className="logo">
          {requestdata != undefined && requestdata[0].realName + "你好！"}
        </div>
        <Menu
          selectable
          theme="light"
          onClick={menuclick}
          mode="inline"
          selectedKeys={[clickkey]}
          defaultSelectedKeys={[clickkey]}
        >
          <Menu.Item key="1" icon={<MediumOutlined />}>
            成绩管理
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            成绩表
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            个人信息
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "30px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <Tooltip title="欢迎光临成绩管理系统!">
            <span style={{ fontSize: 25 }}>教师成绩管理系统</span>
          </Tooltip>

          <Button icon={<PoweroffOutlined />} href="/login" danger>
            退出
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 618,
          }}
        >
          {clickkey === "1" && <StuInfo></StuInfo>}
          {clickkey === "2" && <GradeTable></GradeTable>}
          {clickkey === "3" && <TeacherPerson></TeacherPerson>}
        </Content>
      </Layout>
    </Layout>
  );
}
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({
    user: state.user,
  })
  //  函数确定
)(Teachers);
