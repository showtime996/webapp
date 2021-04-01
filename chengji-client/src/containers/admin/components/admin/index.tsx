import { Button, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "./index.less";
import Cookies from "js-cookie";
const { Header, Sider, Content, Footer } = Layout;
export default function Teachers() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  const btnclearcookie = () => {
    Cookies.remove("userid");
  };
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        style={{ backgroundColor: "#fff" }}
        collapsed={state.collapsed}
      >
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            成绩管理
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            成绩表
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
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
          <Button onClick={btnclearcookie} href="/login" danger>
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
