import { Layout, Menu, Table } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import "./index.less";
import Cookies from "js-cookie"; // 可以操作前端cookie的对象 set()/get()/remove()
import { connect, RootStateOrAny } from "react-redux";
import { SearchClass, getUser } from "../../redux/actions";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Administer = (props) => {
  const [state, setState] = useState({
    collapsed: false,
  });
  const [dataSource, setDataSource] = useState();

  // reqClassSearch("604a21c9e7c2c539788d8a0e").then((e) => {
  //   console.log("e", e);
  // });

  const userid = Cookies.get("userid");
  const { _id } = props.user;
  if (userid && !_id) {
    // 发送异步请求, 获取user
    // console.log('发送ajax请求获取user')

    props.getUser();
  }

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  const columns: any = [
    {
      title: "班级",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "密码",
      key: "password",
      dataIndex: "password",
    },
    // {
    //   title: "学生",
    //   key: "student",
    //   dataIndex: "student",
    // },
    // {
    //   title: "学院",
    //   key: "department",
    //   dataIndex: "department",
    // },
  ];
  return (
    <Layout>
      <Sider
        style={{ backgroundColor: "#57cf9e" }}
        trigger={null}
        collapsible
        collapsed={state.collapsed}
      >
        <div className="logo" />
        <Menu
          style={{ backgroundColor: "#57cf9e", border: "1px solid #57cf9e" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            班级管理
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            课程管理
          </Menu.Item>
          <SubMenu key="3" icon={<UserOutlined />} title="成绩管理">
            <Menu.Item key="6">Tom</Menu.Item>
            <Menu.Item key="7">Bill</Menu.Item>
            <Menu.Item key="8">Alex</Menu.Item>
          </SubMenu>

          <Menu.Item key="4" icon={<UploadOutlined />}>
            评价管理
          </Menu.Item>
          <Menu.Item key="5" icon={<UploadOutlined />}>
            人员管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ backgroundColor: "#57cf9e" }}>
          {React.createElement(
            state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 618,
          }}
        >
          <Table columns={columns} dataSource={dataSource}></Table>
        </Content>
      </Layout>
    </Layout>
  );
};
export default connect((state: RootStateOrAny) => ({ user: state.user }), {
  SearchClass,
  getUser,
})(Administer);
