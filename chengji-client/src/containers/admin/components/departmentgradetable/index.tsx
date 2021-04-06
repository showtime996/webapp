import {
  Table,
  Button,
  Space,
  Tooltip,
  Select,
  Tag,
  Typography,
  Form,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  AdminUserid,
  getAdminGradeCountInfo,
  getGradeCheat,
} from "@/redux/actions";
import { connect, RootStateOrAny } from "react-redux";
import Cookies from "js-cookie";
import ProTable from "@ant-design/pro-table";
import type { ActionType } from "@ant-design/pro-table";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import DepartmentEditTableModal from "./components/model";
const originData: any = [];
const cookicedata: any = [];
const searchdata: any = [];
let flag = 0;
const DepartmentGradeTable = (props) => {
  const userid = Cookies.get("userid");
  useEffect(() => {
    props.AdminUserid({ id: userid });
  }, []);
  const { Option } = Select;

  const cookiceuserid = props.cooikeuserid;

  const cookicelength = cookiceuserid.length;
  if (JSON.stringify(cookiceuserid) != "{}") {
    for (let i in cookiceuserid) {
      if (cookiceuserid[i]) {
        cookicedata.push({
          key: i + 1,
          username: cookiceuserid[i].username,
          password: cookiceuserid[i].password,
          type: cookiceuserid[i].type,
          realName: cookiceuserid[i].realName,
          sex: cookiceuserid[i].sex,
          affiliation: cookiceuserid[i].affiliation,
          age: cookiceuserid[i].age,
          department: cookiceuserid[i].department,
          duty: cookiceuserid[i].duty,
          IDcard: cookiceuserid[i].IDcard,
          diploma: cookiceuserid[i].diploma,
          phone: cookiceuserid[i].phone,
          eMail: cookiceuserid[i].eMail,
        });
        props.getAdminGradeCountInfo(cookicedata[0]);
      }
    }
  }
  useEffect(() => {}, []);
  const actionRef = useRef<ActionType>();

  const formatedata = props.gradecount;
  const [classnodata, setclassnodata] = useState();
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
        department: formatedata[i].department,
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
    },
    {
      title: "姓名",
      dataIndex: "realName",
      key: "realName",

      filteredValue: filteredInfo.realName || null,
      onFilter: (value, record) => record.realName.includes(value),
      //   sorter: (a, b) => a.realName.length - b.realName.length,
      sortOrder: sortedInfo.columnKey === "realName" && sortedInfo.order,
    },
    {
      title: "学院",
      dataIndex: "department",
      key: "department",

      filteredValue: filteredInfo.department || null,
      onFilter: (value, record) => record.department.includes(value),
      //   sorter: (a, b) => a.cname.length - b.cname.length,
      sortOrder: sortedInfo.columnKey === "department" && sortedInfo.order,
    },
    {
      title: "专业",
      dataIndex: "cname",
      key: "cname",
      filters: [
        {
          text: originData[0]?.cname,
          value: originData[0]?.cname,
        },
        {
          text: originData[1]?.cname,
          value: originData[1]?.cname,
        },
        {
          text: originData[2]?.cname,
          value: originData[2]?.cname,
        },
        {
          text: originData[3]?.cname,
          value: originData[3]?.cname,
        },
        {
          text: originData[4]?.cname,
          value: originData[4]?.cname,
        },
        {
          text: originData[5]?.cname,
          value: originData[5]?.cname,
        },
      ],
      filteredValue: filteredInfo.cname || null,
      onFilter: (value, record) => record.cname.includes(value),
      //   sorter: (a, b) => a.cname.length - b.cname.length,
      sortOrder: sortedInfo.columnKey === "cname" && sortedInfo.order,
    },
    {
      title: "班级",
      dataIndex: "classno",
      key: "classno",
      filters: [
        {
          text: originData[0]?.classno,
          value: originData[0]?.classno,
        },
        {
          text: originData[1]?.classno,
          value: originData[1]?.classno,
        },
        {
          text: originData[2]?.classno,
          value: originData[2]?.classno,
        },
        {
          text: originData[3]?.classno,
          value: originData[3]?.classno,
        },
        {
          text: originData[4]?.classno,
          value: originData[4]?.classno,
        },
        {
          text: originData[5]?.classno,
          value: originData[5]?.classno,
        },
      ],
      filteredValue: filteredInfo.classno || null,
      onFilter: (value, record) => record.classno.includes(value),
      //   sorter: (a, b) => a.classno.length - b.classno.length,
      sortOrder: sortedInfo.columnKey === "classno" && sortedInfo.order,
    },

    {
      title: "总学分",
      dataIndex: "countcredit",
      key: "countcredit",
      //   sorter: (a, b) => a.countcredit - b.countcredit,
      sortOrder: sortedInfo.columnKey === "countcredit" && sortedInfo.order,
    },
    {
      title: "平均学分",
      dataIndex: "averagecountcredit",
      key: "averagecountcredit",
      sorter: (a, b) => a.averagecountcredit - b.averagecountcredit,
      sortOrder:
        sortedInfo.columnKey === "averagecountcredit" && sortedInfo.order,
    },
    {
      title: "总分",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
      sortOrder: sortedInfo.columnKey === "count" && sortedInfo.order,
    },
    {
      title: "平均分",
      dataIndex: "average",
      key: "average",
      sorter: (a, b) => a.average - b.average,
      sortOrder: sortedInfo.columnKey === "average" && sortedInfo.order,
    },
    {
      title: "总绩点",
      dataIndex: "countgpa",
      key: "countgpa",
      //   sorter: (a, b) => a.countgpa - b.countgpa,
      sortOrder: sortedInfo.columnKey === "countgpa" && sortedInfo.order,
    },
    {
      title: "平均绩点",
      dataIndex: "averagegpa",
      key: "averagegpa",
      sorter: (a, b) => a.averagegpa - b.averagegpa,
      sortOrder: sortedInfo.columnKey === "averagegpa" && sortedInfo.order,
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (_, record) => (
        <Typography.Link>
          <DepartmentEditTableModal
            clickdata={record}
          ></DepartmentEditTableModal>
        </Typography.Link>
      ),
    },
  ];

  const onFinish = (e) => {
    props.getGradeCheat(e);

    flag = 1;
  };
  const search = props.gradecount;

  const serachtemp = search.length;
  searchdata.length = 0;
  if (JSON.stringify(search) !== "{}") {
    for (let i = searchdata.length; i < serachtemp; i++) {
      searchdata.push({
        key: i + 1,
        username: search[i].username,
        realName: search[i].realName,
        cname: search[i].cname,
        classno: search[i].classno,
        department: search[i].department,
        countcredit: search[i].countcredit,
        averagecountcredit: search[i].averagecountcredit,

        count: search[i].count,
        average: search[i].average,
        countgpa: search[i].countgpa,
        averagegpa: search[i].averagegpa,
      });
    }
  }
  return (
    <>
      <ProTable
        columns={columns}
        dataSource={flag === 0 ? [...originData] : [...searchdata]}
        onChange={handleChange}
        options={{ fullScreen: true, reload: false }}
        actionRef={actionRef}
        search={false}
        bordered
        toolBarRender={() => [
          <Form name="nest-messages" layout="inline" onFinish={onFinish}>
            <Form.Item name={"classno"} label="班级">
              <Select placeholder="请选择班级">
                <Option value={originData[0]?.classno}>
                  {originData[0]?.classno}
                </Option>
                <Option value={originData[0]?.cname + "2"}>
                  {originData[0]?.cname + "2"}
                </Option>
                <Option value={originData[0]?.cname + "3"}>
                  {originData[0]?.cname + "3"}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item name={"flaggrade"} label="不及格">
              <Select placeholder="请选择">
                <Option value="不及格">不及格</Option>
              </Select>
            </Form.Item>
            <Form.Item name={"flagcheat"} label="作弊">
              <Select placeholder="请选择">
                <Option value="作弊">作弊</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Tooltip title="查找">
                <Button
                  htmlType="submit"
                  style={{ border: 0 }}
                  shape="circle"
                  icon={<SearchOutlined />}
                />
              </Tooltip>
            </Form.Item>
          </Form>,
          <Tooltip title="刷新">
            <Button
              style={{ border: 0 }}
              shape="circle"
              onClick={refresh}
              icon={<RedoOutlined />}
            />
          </Tooltip>,
        ]}
        headerTitle="学院成绩信息表"
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
  { AdminUserid, getAdminGradeCountInfo, getGradeCheat }
)(DepartmentGradeTable);
