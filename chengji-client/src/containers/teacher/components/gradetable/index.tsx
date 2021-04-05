import { Table, Button, Space, Tooltip, Tag, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { TeacherUserid, getGradeCountInfo } from "@/redux/actions";
import { connect, RootStateOrAny } from "react-redux";
import Cookies from "js-cookie";
import ProTable from "@ant-design/pro-table";
import type { ActionType } from "@ant-design/pro-table";
import { RedoOutlined, FormOutlined } from "@ant-design/icons";
import EditModal from "../modal";
const originData: any = [];
const cookicedata: any = [];
const GradeTable = (props) => {
  const userid = Cookies.get("userid");
  useEffect(() => {
    props.TeacherUserid({ id: userid });
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
        cname: cookiceuserid[i].cname,
        classno: cookiceuserid[i].classno,
        sex: cookiceuserid[i].sex,
        department: cookiceuserid[i].department,
        affiliation: cookiceuserid[i].affiliation,
        age: cookiceuserid[i].age,
        duty: cookiceuserid[i].duty,
        IDcard: cookiceuserid[i].IDcard,
        nation: cookiceuserid[i].nation,
        region: cookiceuserid[i].region,
        phone: cookiceuserid[i].phone,
        eMail: cookiceuserid[i].eMail,
        street: cookiceuserid[i].street,
        diploma: cookiceuserid[i].diploma,
      });
    }
  }
  const actionRef = useRef<ActionType>();
  useEffect(() => {
    props.getGradeCountInfo(cookicedata[0]);
  }, []);
  const formatedata = props.gradecount;

  const temp = formatedata.length;
  originData.length = 0;
  if (JSON.stringify(formatedata) !== "{}") {
    for (let i = originData.length; i < temp; i++) {
      originData.push({
        key: i + 1,

        classno: formatedata[i].classno,
        username: formatedata[i].username,
        realName: formatedata[i].realName,
        cname: formatedata[i].cname,

        countcredit: formatedata[i].countcredit,
        averagecountcredit: formatedata[i].averagecountcredit,

        count: formatedata[i].count,
        average: formatedata[i].average,
        countgpa: formatedata[i].countgpa,
        averagegpa: formatedata[i].averagegpa,
      });
    }
  }
  const [state, setState]: any = useState({
    filteredInfo: null,
    sortedInfo: null,
  });
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "countgpa",
      },
    });
  };
  const refresh = () => {
    window.history.go(0);
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns: any = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "学号",
      dataIndex: "username",
      key: "username",

      filteredValue: filteredInfo.username || null,
      onFilter: (value, record) => record.username.includes(value),
      //   sorter: (a, b) => a.username.length - b.username.length,
      sortOrder: sortedInfo.columnKey === "username" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "姓名",
      dataIndex: "realName",
      key: "realName",

      filteredValue: filteredInfo.realName || null,
      onFilter: (value, record) => record.realName.includes(value),
      //   sorter: (a, b) => a.realName.length - b.realName.length,
      sortOrder: sortedInfo.columnKey === "realName" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "专业",
      dataIndex: "cname",
      key: "cname",

      filteredValue: filteredInfo.cname || null,
      onFilter: (value, record) => record.cname.includes(value),
      //   sorter: (a, b) => a.cname.length - b.cname.length,
      sortOrder: sortedInfo.columnKey === "cname" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "班级",
      dataIndex: "classno",
      key: "classno",
      filters: [
        {
          text: cookicedata[0].cname + "1",
          value: cookicedata[0].cname + "1",
        },
        {
          text: cookicedata[0].cname + "2",
          value: cookicedata[0].cname + "2",
        },
        {
          text: cookicedata[0].cname + "3",
          value: cookicedata[0].cname + "3",
        },
      ],
      filteredValue: filteredInfo.classno || null,
      onFilter: (value, record) => record.classno.includes(value),
      //   sorter: (a, b) => a.classno.length - b.classno.length,
      sortOrder: sortedInfo.columnKey === "classno" && sortedInfo.order,
      ellipsis: true,
    },

    {
      title: "总学分",
      dataIndex: "countcredit",
      key: "countcredit",
      //   sorter: (a, b) => a.countcredit - b.countcredit,
      sortOrder: sortedInfo.columnKey === "countcredit" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "平均学分",
      dataIndex: "averagecountcredit",
      key: "averagecountcredit",
      sorter: (a, b) => a.averagecountcredit - b.averagecountcredit,
      sortOrder:
        sortedInfo.columnKey === "averagecountcredit" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "总分",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
      sortOrder: sortedInfo.columnKey === "count" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "平均分",
      dataIndex: "average",
      key: "average",
      sorter: (a, b) => a.average - b.average,
      sortOrder: sortedInfo.columnKey === "average" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "总绩点",
      dataIndex: "countgpa",
      key: "countgpa",
      //   sorter: (a, b) => a.countgpa - b.countgpa,
      sortOrder: sortedInfo.columnKey === "countgpa" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "平均绩点",
      dataIndex: "averagegpa",
      key: "averagegpa",
      sorter: (a, b) => a.averagegpa - b.averagegpa,
      sortOrder: sortedInfo.columnKey === "averagegpa" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <Typography.Link>
          <EditModal></EditModal>
        </Typography.Link>
      ),
    },
  ];

  return (
    <>
      {/* <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space> */}
      <ProTable
        columns={columns}
        dataSource={[...originData]}
        onChange={handleChange}
        options={{ fullScreen: true, reload: false }}
        actionRef={actionRef}
        search={false}
        bordered
        toolBarRender={() => [
          <Tooltip title="刷新">
            <Button
              style={{ border: 0 }}
              shape="circle"
              onClick={refresh}
              icon={<RedoOutlined />}
            />
          </Tooltip>,
        ]}
        headerTitle="班级成绩信息表"
      />
    </>
  );
};

export default connect(
  // user: state.user  state=user 读取从reducer返回值状态到组件里面 到props属性里面
  (state: RootStateOrAny) => ({
    grade: state.grade,
    cooikeuserid: state.cooikeuserid,
    gradecount: state.gradecount,
  }),
  //  函数确定
  { TeacherUserid, getGradeCountInfo }
)(GradeTable);
