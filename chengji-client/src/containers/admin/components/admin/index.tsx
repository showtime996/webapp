import { Button, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  CalendarOutlined,
  MediumOutlined,
  MailOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./index.less";
import DepartmentGradeTable from "../departmentgradetable";
import { AdminUserid } from "@/redux/actions";
import Cookies from "js-cookie";
import AdminPerson from "../personinfo";
import { connect, RootStateOrAny } from "react-redux";
import SubMenu from "antd/lib/menu/SubMenu";
import Studentinfomation from "../addstudent";
import Teacherinfomation from "../addteacher";
import request from "umi-request";
const { Header, Sider, Content, Footer } = Layout;
const cookicedata: any = [];
function Administer() {
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
          <Menu.Item key="1" icon={<CalendarOutlined />}>
            学院成绩表
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            个人信息
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="账号管理">
            <Menu.Item key="3">学生信息</Menu.Item>
            <Menu.Item key="4">教师信息</Menu.Item>
          </SubMenu>
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
          {clickkey === "1" && <DepartmentGradeTable></DepartmentGradeTable>}
          {clickkey === "2" && <AdminPerson></AdminPerson>}
          {clickkey === "3" && <Studentinfomation></Studentinfomation>}
          {clickkey === "4" && <Teacherinfomation></Teacherinfomation>}
        </Content>
      </Layout>
    </Layout>
  );
}
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({
    user: state.user,
  }),
  //  函数确定
  { AdminUserid }
)(Administer);
