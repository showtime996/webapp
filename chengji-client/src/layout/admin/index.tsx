import { Button, Form, Layout, Menu, Select, Table } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import "./index.less";
import Cookies from "js-cookie"; // 可以操作前端cookie的对象 set()/get()/remove()
import { connect, RootStateOrAny } from "react-redux";
import { SearchClass, getUser } from "../../redux/actions";
import type { TablePaginationConfig } from "antd/lib/table/interface";
import type { ActionType } from "@ant-design/pro-table";
import { reqStudentInfo } from "@/api";
import ProTable from "@ant-design/pro-table";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Administer = (props) => {
  const [state, setState] = useState({
    collapsed: false,
  });
  const [filter] = Form.useForm();
  const [dataSource, setDataSource] = useState();
  const actionRef = useRef<ActionType>();
  const [tableinfo, setTableinfo] = useState({ current: 0, pageSize: 10 });
  // reqClassSearch("604a21c9e7c2c539788d8a0e").then((e) => {
  //   console.log("e", e);
  // });
  useEffect(() => {
    const userid = Cookies.get("userid");
    const { _id } = props.user;
    if (userid && !_id) {
      // 发送异步请求, 获取user
      // console.log('发送ajax请求获取user')

      props.getUser();
    }
  });
  console.log("props", props);

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  // const getTableData = async ({ current, pageSize }: any) =>
  //   reqStudentInfo({
  //     InviteStatus: filter.getFieldsValue().InviteStatus,
  //     SkipCount: pageSize * (current - 1),
  //     MaxResultCount: pageSize,
  //   }).then((res) => {
  //     if (!res.items) return { total: 0, data: [], success: true };
  //     setTableinfo({ current, pageSize });
  //     // res.items.forEach((e) => {
  //     //   e.inviteTime = handleDate(e.inviteTime);
  //     // });
  //     return { total: res.totalCount, data: res.items, success: true };
  //   });

  // 刷新table数据
  const refreshTable = () => {
    actionRef.current?.reloadAndRest && actionRef.current?.reloadAndRest();
  };

  const columns: any = [
    {
      title: "序号",
      key: "dataIndex",
      dataIndex: "dataIndex",
    },
    {
      title: "班级名称",
      key: "cname",
      dataIndex: "cname",
    },
    {
      title: "班级",
      key: "classno",
      dataIndex: "classno",
    },
    {
      title: "学院",
      key: "department",
      dataIndex: "department",
    },
    {
      title: "学生",
      key: "Susername",
      dataIndex: "Susername",
    },
  ];
  return (
    <Layout>
      <Sider
        style={{ backgroundColor: "#fff" }}
        trigger={null}
        collapsible
        collapsed={state.collapsed}
      >
        <div className="logo" />
        <Menu
          style={{ backgroundColor: "#fff", border: "1px solid #fff" }}
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
        <Header style={{ backgroundColor: "#fff" }}>
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
          <Table columns={columns} options={{}}></Table>
          {/* <ProTable
            columns={columns}
            rowKey="dataIndex"
            search={false}
            options={{
              reload: () => refreshTable,
            }}
            actionRef={actionRef}
            // request={getTableData}
            // pagination={paginationRender}
            scroll={{ y: `calc(100% - 40px)` }}
            // headerTitle={
            //   <>
            //     <Button
            //       type="primary"
            //       style={{ position: "absolute", left: 24 }}
            //     >
            //       ssss
            //     </Button>
            //   </>
            // }
            // toolBarRender={() => []}
          /> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default connect((state: RootStateOrAny) => ({ user: state.user }), {
  SearchClass,
  getUser,
})(Administer);
