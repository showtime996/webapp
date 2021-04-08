import { Button, Layout, Menu } from "antd";
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
import TeacherPerson from "../components/person";
import { TeacherUserid } from "@/redux/actions";
import Cookies from "js-cookie";
import GradeTable from "../components/gradetable";
import StuInfo from "@/containers/teacher/components/stuinfo";
import { connect, RootStateOrAny } from "react-redux";
const { Header, Sider, Content, Footer } = Layout;
const cookicedata: any = [];
function Teachers(props) {
  const [state, setState] = useState({
    collapsed: false,
  });
  const [clickkey, setclickkey] = useState("1");
  // useEffect(() => {
  //   props.getUser();
  // }, [StuInfo]);

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
  useEffect(() => {
    props.TeacherUserid({ id: userid });
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
          {props.cooikeuserid[0]?.realName &&
            props.cooikeuserid[0].realName + "你好！"}
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
    cooikeuserid: state.cooikeuserid,
  }),
  //  函数确定
  { TeacherUserid }
)(Teachers);
