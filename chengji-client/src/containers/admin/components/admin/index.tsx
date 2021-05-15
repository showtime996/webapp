import { Button, Layout, Menu, Tooltip } from "antd";
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
import Admininfomation from "../addadmin";
import request from "umi-request";

const { Header, Sider, Content, Footer } = Layout;
const cookicedata: any = [];
function Administer(props) {
  const userid = Cookies.get("userid");
  useEffect(() => {
    props.AdminUserid({ id: userid });
  }, []);
  const cookiceuserid = props.cooikeuserid;
  const cookicelength = cookiceuserid.length;
  if (JSON.stringify(cookiceuserid) !== "{}") {
    for (let i = cookicedata.length; i < cookicelength; i++) {
      console.log("cookiceuserid", cookiceuserid);
      cookicedata.push({
        key: i + 1,
        username: cookiceuserid[i].username,
        password: cookiceuserid[i].password,
        type: cookiceuserid[i].type,
        realName: cookiceuserid[i].realName,

        sex: cookiceuserid[i].sex,
        department: cookiceuserid[i].department,

        age: cookiceuserid[i].age,
        duty: cookiceuserid[i].duty,
        IDcard: cookiceuserid[i].IDcard,

        phone: cookiceuserid[i].phone,
        eMail: cookiceuserid[i].eMail,

        diploma: cookiceuserid[i].diploma,
      });
    }
  }

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
          {JSON.stringify(cookicedata) != "{}" &&
            cookicedata[0]?.realName + "你好！"}
        </div>
        <Menu
          selectable
          theme="light"
          onClick={menuclick}
          mode="inline"
          selectedKeys={[clickkey]}
          defaultSelectedKeys={[clickkey]}
        >
          {/* <Menu.Item key="1" icon={<CalendarOutlined />}>
            学院成绩表
          </Menu.Item> */}

          <SubMenu key="sub1" icon={<MailOutlined />} title="账号管理">
            <Menu.Item key="1">学生信息</Menu.Item>
            <Menu.Item key="2">教师信息</Menu.Item>
            <Menu.Item key="3">管理员信息</Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<UserOutlined />}>
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
            <span style={{ fontSize: 25 }}>管理员成绩管理系统</span>
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
          {/* {clickkey === "1" && <DepartmentGradeTable></DepartmentGradeTable>} */}

          {clickkey === "1" && <Studentinfomation></Studentinfomation>}
          {clickkey === "2" && <Teacherinfomation></Teacherinfomation>}
          {clickkey === "3" && <Admininfomation></Admininfomation>}
          {clickkey === "4" && <AdminPerson></AdminPerson>}
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
  { AdminUserid }
)(Administer);
