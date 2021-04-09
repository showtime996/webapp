import { Layout, Menu, Breadcrumb, Button } from "antd";
import React, { useEffect, useState } from "react";
import "./index.less";
import { StudentUserid } from "@/redux/actions";
import Cookies from "js-cookie";
import PersonalGradeTable from "../personalgrade";
import { connect, RootStateOrAny } from "react-redux";
import StudentPerson from "../personanl";
import request from "umi-request";
function PersonalCommonL() {
  const { Header, Footer, Sider, Content } = Layout;
  const btnclearcookie = () => {
    Cookies.remove("userid");
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
  const [state, setState] = useState("1");
  const clickkey = (e) => {
    setState(e.key);
  };
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <div>
          {requestdata != undefined && requestdata[0].realName + "你好！"}
        </div>
        <Menu
          theme="light"
          onClick={clickkey}
          mode="horizontal"
          defaultValue={state}
          selectedKeys={[state]}
          defaultSelectedKeys={[state]}
        >
          <Menu.Item key="1">个人成绩表</Menu.Item>
          <Menu.Item key="2">个人信息</Menu.Item>
        </Menu>
        <Button onClick={btnclearcookie} href="/login" danger>
          退出
        </Button>
      </Header>
      <Content style={{ padding: "0 50px", minHeight: 590 }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        {state === "1" && <PersonalGradeTable></PersonalGradeTable>}
        {state === "2" && <StudentPerson></StudentPerson>}
      </Content>

      <Footer style={{ textAlign: "center" }}>
        成绩管理系统 ©2021 Created by 许浩然
      </Footer>
    </Layout>
  );
}
export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({
    cooikeuserid: state.cooikeuserid,
  }),
  //  函数确定
  { StudentUserid }
)(PersonalCommonL);
